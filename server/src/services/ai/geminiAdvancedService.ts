import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
import Redis from 'ioredis';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import { geminiConfig } from '../../config/geminiConfig';
import prisma from '../../lib/prisma';
import crypto from 'crypto';

export class GeminiAdvancedService {
    private genAI: GoogleGenerativeAI;
    private redis: Redis;
    private rateLimiter: RateLimiterRedis;
    private models: Record<string, GenerativeModel> = {};

    constructor() {
        this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
        
        this.redis = new Redis({
            host: process.env.REDIS_HOST || 'localhost',
            port: parseInt(process.env.REDIS_PORT || '6379'),
            password: process.env.REDIS_PASSWORD,
            retryStrategy: (times) => Math.min(times * 50, 2000)
        });

        this.rateLimiter = new RateLimiterRedis({
            storeClient: this.redis,
            keyPrefix: 'gemini_rl',
            points: geminiConfig.rateLimits.requestsPerMinute,
            duration: 60,
        });

        this.initializeModels();
    }

    private initializeModels() {
        Object.entries(geminiConfig.models).forEach(([key, config]) => {
            this.models[key] = this.genAI.getGenerativeModel({
                model: config.name,
                generationConfig: config.config,
                safetySettings: geminiConfig.safetySettings,
            });
        });
    }

    /**
     * Generate response with caching, rate limiting, and retries
     */
    async generateResponse(prompt: string, modelSelection: any, userId?: string): Promise<string> {
        try {
            if (userId) await this.checkRateLimit(userId);

            const cacheKey = this.getCacheKey(userId || 'anonymous', prompt);
            if (geminiConfig.cache.enabled) {
                const cached = await this.getFromCache(cacheKey);
                if (cached) return cached;
            }

            const modelKey = Object.keys(geminiConfig.models).find(
                k => (geminiConfig.models as any)[k].name === modelSelection.name
            ) || 'flash';

            const result = await this.generateWithRetry(this.models[modelKey], prompt);
            const response = await result.response;
            const text = response.text();

            if (geminiConfig.cache.enabled) {
                await this.saveToCache(cacheKey, text, geminiConfig.cache.conversationTTL);
            }

            if (userId) {
                await this.logUsage(userId, {
                    model: modelSelection.name,
                    tokensUsed: this.estimateTokens(text),
                    finishReason: response.candidates?.[0]?.finishReason
                });
            }

            return text;
        } catch (error: any) {
            console.error('[Gemini Service Error]', error);
            if (error.res && error.res.status === 429) {
                throw new Error('RATE_LIMIT_EXCEEDED');
            }
            throw error;
        }
    }

    private async generateWithRetry(model: GenerativeModel, prompt: string, attempt: number = 1): Promise<any> {
        try {
            return await model.generateContent(prompt);
        } catch (error: any) {
            if (attempt >= geminiConfig.retry.maxRetries) throw error;
            
            const delay = geminiConfig.retry.initialDelayMs * Math.pow(geminiConfig.retry.backoffMultiplier, attempt - 1);
            await new Promise(resolve => setTimeout(resolve, delay));
            return this.generateWithRetry(model, prompt, attempt + 1);
        }
    }

    private async checkRateLimit(userId: string) {
        try {
            await this.rateLimiter.consume(userId, 1);
        } catch (e) {
            throw new Error('RATE_LIMIT_EXCEEDED');
        }
    }

    private getCacheKey(userId: string, prompt: string): string {
        const hash = crypto.createHash('md5').update(prompt).digest('hex');
        return `gemini:cache:${userId}:${hash}`;
    }

    private async getFromCache(key: string): Promise<string | null> {
        try {
            return await this.redis.get(key);
        } catch (e) {
            return null;
        }
    }

    private async saveToCache(key: string, value: string, ttl: number) {
        try {
            await this.redis.setex(key, ttl, value);
        } catch (e) {
            console.error('[Cache Save Error]', e);
        }
    }

    private async logUsage(userId: string, metadata: any) {
        try {
            await prisma.usageLog.create({
                data: {
                    userId,
                    service: 'GEMINI',
                    model: metadata.model,
                    tokensUsed: metadata.tokensUsed,
                    finishReason: metadata.finishReason
                }
            });
        } catch (e) {
            console.error('[Usage Log Error]', e);
        }
    }

    private estimateTokens(text: string): number {
        return Math.ceil(text.length / 4);
    }
}

export const geminiAdvanced = new GeminiAdvancedService();
