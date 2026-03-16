import prisma from './src/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

async function test() {
    try {
        const user = await prisma.user.findFirst({ where: { password: { not: null } } });
        if (!user) {
            console.log('No user with password');
            return;
        }
        console.log('User:', user.email);
        
        let usr = user;
        const isMatch = await bcrypt.compare('test', usr.password!);
        console.log('isMatch:', isMatch);
        
        if (!usr.isVerified) {
            usr = await prisma.user.update({
                where: { id: usr.id },
                data: { isVerified: true }
            });
            console.log('User updated');
        }

        const token = jwt.sign({ userId: usr.id, email: usr.email }, 'secret', { expiresIn: '7d' });
        console.log('Token created length:', token.length);
    } catch (e) {
        console.error('ERROR:', e);
    } finally {
        await prisma.$disconnect();
    }
}
test();
