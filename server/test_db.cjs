const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
    try {
        const users = await prisma.user.findMany();
        console.log('Users found:', users.length);
        process.exit(0);
    } catch (err) {
        console.error('Error during test:', err);
        process.exit(1);
    }
}

test();
