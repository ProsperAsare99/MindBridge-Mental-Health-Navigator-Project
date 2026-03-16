import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        console.log('Testing Prisma Connection...');
        const user = await prisma.user.findFirst();
        console.log('Found user:', user ? user.id : 'No users');
        
        if (user) {
            console.log('Testing ChatMessage findMany...');
            const history = await prisma.chatMessage.findMany({
                where: { userId: user.id },
                orderBy: { createdAt: 'asc' },
                take: 5
            });
            console.log('Success!', history.length, 'messages found.');
        }
    } catch (e) {
        console.error('Prisma Error:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
