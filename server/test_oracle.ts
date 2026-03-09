import dotenv from 'dotenv';
dotenv.config();
import { GoogleGenerativeAI } from '@google/generative-ai';
import { PrismaClient } from '@prisma/client';

async function test() {
    console.log('--- Oracle Diagnostic ---');
    console.log('GEMINI_API_KEY present:', !!process.env.GEMINI_API_KEY);
    console.log('PORT:', process.env.PORT);

    const prisma = new PrismaClient();
    try {
        console.log('Testing Prisma chatMessage model...');
        const count = await prisma.chatMessage.count();
        console.log('Successfully connected to DB. Chat messages count:', count);
    } catch (e: any) {
        console.error('Prisma Error:', e.message);
    }

    try {
        console.log('Testing Gemini API...');
        if (!process.env.GEMINI_API_KEY) throw new Error('API Key missing');
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("Hello, are you there?");
        console.log('Gemini Response:', result.response.text());
    } catch (e: any) {
        console.error('Gemini Error:', e.message);
    }

    await prisma.$disconnect();
    console.log('--- Diagnostic Complete ---');
}

test();
