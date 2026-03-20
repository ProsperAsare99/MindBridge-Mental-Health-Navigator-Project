import { PrismaClient } from '@prisma/client';

const createPrismaClient = () => {
    const dbUrl = process.env.DATABASE_URL;
    console.log(`[Prisma] Connecting to: ${dbUrl?.substring(0, 60)}...`);
    
    return new PrismaClient({
        datasources: {
            db: { url: dbUrl }
        },
        log: ['error', 'warn']
    });
};

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
