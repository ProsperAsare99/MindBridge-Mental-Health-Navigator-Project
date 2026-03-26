import type { PrismaClient as PrismaClientType } from '@prisma/client';

let _prisma: PrismaClientType | null = null;

const createPrismaClient = (): PrismaClientType => {
    const { PrismaClient } = require('@prisma/client');
    return new PrismaClient({
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

export const testConnection = async (): Promise<boolean> => {
    const client = getPrisma();
    try {
        // Simple query to verify connection
        await client.$queryRaw`SELECT 1`;
        console.log('[PRISMA] Database connection successful.');
        return true;
    } catch (error: any) {
        console.error('[PRISMA ERROR] Database connection failed:', {
            message: error.message,
            code: error.code,
            meta: error.meta
        });
        return false;
    }
};

export default prismaProxy;
