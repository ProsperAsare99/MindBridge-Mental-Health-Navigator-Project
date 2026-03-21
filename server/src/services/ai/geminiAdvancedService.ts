import { GoogleGenerativeAI } from '@google/generative-ai';
import { geminiConfig } from '../../config/geminiConfig';

export class GeminiAdvancedService {
    private genAI: GoogleGenerativeAI;

    constructor() {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) throw new Error('GEMINI_API_KEY is not set');
        this.genAI = new GoogleGenerativeAI(apiKey);
    }

    /**
     * Generate content using the specified model profile
     */
    async generateResponse(prompt: string, modelProfile: any): Promise<string> {
        const model = this.genAI.getGenerativeModel({
            model: modelProfile.name,
            generationConfig: modelProfile.config,
            safetySettings: geminiConfig.safetySettings
        });

        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        if (!text) throw new Error('Empty response from AI');
        return text;
    }
}

export const geminiAdvanced = new GeminiAdvancedService();
