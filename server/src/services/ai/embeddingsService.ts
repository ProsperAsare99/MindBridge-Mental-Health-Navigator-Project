import { GoogleGenerativeAI } from "@google/generative-ai";

export class EmbeddingsService {
    private genAI: GoogleGenerativeAI;
    private model: any;

    constructor() {
        if (!process.env.GEMINI_API_KEY) {
            throw new Error("GEMINI_API_KEY is not defined in environment variables");
        }
        this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        this.model = this.genAI.getGenerativeModel({ model: "text-embedding-004" });
    }

    /**
     * Generate embedding vector for text
     */
    async generateEmbedding(text: string): Promise<number[]> {
        try {
            const result = await this.model.embedContent(text);
            const embedding = result.embedding;
            return embedding.values;
        } catch (error) {
            console.error("[EmbeddingsService] Error generating embedding:", error);
            throw error;
        }
    }

    /**
     * Calculate cosine similarity between two vectors
     */
    cosineSimilarity(vecA: number[], vecB: number[]): number {
        if (vecA.length !== vecB.length) {
            return 0;
        }
        
        let dotProduct = 0;
        let normA = 0;
        let normB = 0;
        
        for (let i = 0; i < vecA.length; i++) {
            dotProduct += vecA[i] * vecB[i];
            normA += vecA[i] * vecA[i];
            normB += vecB[i] * vecB[i];
        }
        
        return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
    }
}

export const embeddingsService = new EmbeddingsService();
