import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/client_new';

const createPrismaClient = () => {
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
        // adapter,
        log: ['error', 'warn']
    });

    // Stability Extension: Automatic Retries for transient connection errors
    return client.$extends({
        query: {
            $allOperations: async ({ model, operation, args, query }) => {
                let retries = 5; // Increased from 3 to 5 for tougher network conditions
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
                            errorMessage.includes('EAI_AGAIN') || // DNS lookup timed out
                            errorMessage.includes('terminated unexpectedly') ||
                            errorCode === 'ECONNRESET' ||
                            errorCode === 'ETIMEDOUT' ||
                            errorCode === 'ENOTFOUND' ||
                            errorCode === 'EAI_AGAIN' ||
                            errorCode === 'P1001' || // Can't reach DB server
                            errorCode === 'P1017' || // Server closed connection
                            errorCode === 'P2024'; // Connection timeout

                        if (isTransient && retries > 1) {
                            retries--;
                            // Exponential backoff: 2s, 4s, 8s, 16s
                            const attempt = maxRetries - retries;
                            const delay = Math.pow(2, attempt) * 1000;
                            
                            console.warn(`[PRISMA RETRY] ${operation} on ${model} failed (Transient: ${errorCode || 'DNS/Network'}). Attempt ${attempt}/${maxRetries}. Retrying in ${delay}ms...`);
                            
                            await new Promise(resolve => setTimeout(resolve, delay));
                            continue;
                        }
                        
                        if (errorCode === 'ENOTFOUND' || errorMessage.includes('ENOTFOUND')) {
                            console.error(`[PRISMA CRITICAL] Hostname resolution failed for the database. Please check your internet connection and DNS settings.`);
                        }
                        
                        throw error;
                    }
                }
            },
        },
    }) as unknown as PrismaClient;
};

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
