import dotenv from 'dotenv';
dotenv.config();
import { GoogleGenerativeAI } from '@google/generative-ai';

async function listModels() {
    console.log('--- Full Model List ---');
    try {
        if (!process.env.GEMINI_API_KEY) throw new Error('API Key missing');
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        // This is the correct way to list models in the newer SDK versions
        // But it might be on the 'genAI' object or require a separate client?
        // Let's try the HTTP endpoint as a backup if the SDK doesn't expose it easily.

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
        const data = await response.json();

        if (data.error) {
            console.error('API Error:', data.error.message);
        } else {
            console.log('Available Models:');
            data.models?.forEach((m: any) => console.log(`- ${m.name}`));
        }
    } catch (e: any) {
        console.error('Error:', e.message);
    }
}

listModels();
