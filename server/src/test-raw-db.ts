import { Client } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const connectionString = "postgresql://neondb_owner:npg_hvrlmMH2nBe7@ep-cold-art-al16we8v.c-3.eu-central-1.aws.neon.tech/neondb?sslmode=require";

async function testConnection() {
    console.log('--- RAW DB TEST (node-postgres) ---');
    console.log(`Target: ${connectionString.substring(0, 40)}...`);
    
    const client = new Client({
        connectionString: connectionString,
        connectionTimeoutMillis: 10000,
    });

    try {
        console.log('Connecting...');
        await client.connect();
        console.log('✅ SUCCESS: Connected to Neon via node-postgres');
        
        const res = await client.query('SELECT current_user, current_database(), version();');
        console.log('Data:', res.rows[0]);
        
        await client.end();
        console.log('Connection closed.');
    } catch (err: any) {
        console.error('❌ FAILURE:', err.message);
        if (err.stack) console.error(err.stack);
        process.exit(1);
    }
}

testConnection();
