import dotenv from 'dotenv';
dotenv.config();
import { GoogleGenerativeAI } from '@google/generative-ai';

async function listModels() {
    console.log('--- Listing Models ---');
    try {
        if (!process.env.GEMINI_API_KEY) throw new Error('API Key missing');
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // The SDK doesn't have a direct 'listModels' method on genAI, 
        // but we can try to use a basic check or see if there's a way.
        // Actually, the easiest way to test a specific model is to try it.
        // Let's try gemini-pro as a fallback.

        const models = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-pro'];
        for (const m of models) {
            try {
                const model = genAI.getGenerativeModel({ model: m });
                const result = await model.generateContent("Test");
                console.log(`Model ${m} works!`);
                return;
            } catch (e: any) {
                console.log(`Model ${m} failed: ${e.message}`);
            }
        }
    } catch (e: any) {
        console.error('Error:', e.message);
    }
}

listModels();
