import dotenv from 'dotenv';
dotenv.config();

console.log('1. Dotenv configured');

import app from './app';
console.log('1.5 Express app imported');

import { initializeCircles } from './controllers/socialController';
import { initializeChallenges } from './controllers/gamificationController';
console.log('1.7 Background tasks imported');

import { PrismaClient } from '@prisma/client';
console.log('2. PrismaClient class imported');

async function run() {
    try {
        const prisma = new PrismaClient();
        console.log('3. PrismaClient instantiated');
        
        console.log('3.5 Running background initializations...');
        await initializeCircles();
        console.log('3.6 Circles initialized');
        await initializeChallenges();
        console.log('3.7 Challenges initialized');
        
        console.log('4. Done');
    } catch (e: any) {
        console.error('ERROR:', e.message);
        console.error(e.stack);
    }
}

run();
