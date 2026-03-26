import { Pool } from 'pg';

const createPrismaClient = () => {
    const { PrismaClient } = require('@prisma/client');
    const { PrismaPg } = require('@prisma/adapter-pg');
    const connectionString = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_hvrlmMH2nBe7@ep-cold-art-al16we8v.c-3.eu-central-1.aws.neon.tech/neondb?sslmode=verify-full&connection_limit=1";
    
    console.log(`[STABILITY FIX] Initializing Prisma with PG Driver Adapter...`);
    
    const pool = new Pool({ 
        connectionString: connectionString
            .replace(/connection_limit=\d+/, 'connection_limit=10')
            .replace(/sslmode=[^&]+/, 'sslmode=verify-full'),
        max: 10,
        idleTimeoutMillis: 10000, // Reduced from 30s to 10s to close idle connections faster
        connectionTimeoutMillis: 60000, // Increased to 60s for slow hotspot handshakes
        keepAlive: true
    });

    pool.on('error', (err) => {
        console.error('[PRISMA POOL ERROR]', err.message);
    });
    
    // const adapter = new PrismaPg(pool);
    
    // Base client
    const client = new PrismaClient({ 
        log: ['error', 'warn']
    });

    // Stability Extension: Automatic Retries for transient connection errors
    return client.$extends({
        query: {
            $allOperations: async ({ model, operation, args, query }: any) => {
                let retries = 5;
                const maxRetries = retries;
                while (retries > 0) {
                    try {
                        return await query(args);
                    } catch (error: any) {
                        const errorMessage = error.message || '';
                        const errorCode = error.code || '';
                        
                        const isTransient = 
                            errorMessage.includes('ECONNRESET') || 
                            errorMessage.includes('ETIMEDOUT') ||
                            errorMessage.includes('ENOTFOUND') ||
                            errorMessage.includes('EAI_AGAIN') ||
                            errorMessage.includes('terminated unexpectedly') ||
                            errorCode === 'ECONNRESET' ||
                            errorCode === 'ETIMEDOUT' ||
                            errorCode === 'ENOTFOUND' ||
                            errorCode === 'EAI_AGAIN' ||
                            errorCode === 'P1001' ||
                            errorCode === 'P1017' ||
                            errorCode === 'P2024';

                        if (isTransient && retries > 1) {
                            retries--;
                            const attempt = maxRetries - retries;
                            const delay = Math.pow(2, attempt) * 1000;
                            
                            console.warn(`[PRISMA RETRY] ${operation} on ${model} failed. Attempt ${attempt}/${maxRetries}. Retrying in ${delay}ms...`);
                            
                            await new Promise(resolve => setTimeout(resolve, delay));
                            continue;
                        }
                        throw error;
                    }
                }
            },
        },
    }) as any;
};

let prisma: any;

export const getPrisma = () => {
    if (!prisma) {
        prisma = createPrismaClient();
    }
    return prisma;
};

export default getPrisma();
