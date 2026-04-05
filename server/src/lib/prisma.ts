import type { PrismaClient as PrismaClientType } from '../../prisma/generated/client';

let _prisma: PrismaClientType | null = null;

const createPrismaClient = (): PrismaClientType => {
    const { PrismaClient } = require('../../prisma/generated/client');
    const { Pool } = require('pg');
    const { PrismaPg } = require('@prisma/adapter-pg');
    
    // Configure pool for Neon compatibility
    const pool = new Pool({ 
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });

    pool.on('error', (err: any) => {
        console.error('[PRISMA POOL ERROR] Unexpected error on idle client:', err.message);
    });
    
    console.log('[PRISMA] Database pool initialized.');
    
    const adapter = new PrismaPg(pool);
    return new PrismaClient({
        adapter,
        log: ['error', 'warn']
    });
};

const prismaProxy = new Proxy({} as PrismaClientType, {
    get: (target, prop) => {
        if (!_prisma) {
            console.log('[PRISMA] Lazy instantiating PrismaClient...');
            _prisma = createPrismaClient();
        }
        return ( _prisma as any)[prop];
    }
});

export const getPrisma = (): PrismaClientType => {
    if (!_prisma) {
        console.log('[PRISMA] Lazy instantiating PrismaClient...');
        _prisma = createPrismaClient();
    }
    return _prisma;
};

export const testConnection = async (retries = 3): Promise<boolean> => {
    const client = getPrisma();
    for (let i = 0; i < retries; i++) {
        try {
            await client.$queryRaw`SELECT 1`;
            console.log('[PRISMA] Database connection successful.');
            return true;
        } catch (error: any) {
            const isDnsError = error.code === 'ENOTFOUND' || error.message?.includes('getaddrinfo ENOTFOUND');
            
            if (isDnsError) {
                console.error(`[PRISMA DNS ERROR] Attempt ${i + 1}/${retries}: Could not resolve database hostname. Verify your internet connection or check if your Neon project is PAUSED.`);
            } else {
                console.error(`[PRISMA ERROR] Attempt ${i + 1}/${retries}: Database connection failed:`, {
                    message: error.message,
                    code: error.code
                });
            }

            if (i < retries - 1) {
                const delay = Math.pow(2, i) * 1000;
                console.log(`[PRISMA] Retrying in ${delay}ms...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }
    return false;
};

export default prismaProxy;
