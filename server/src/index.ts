import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { initializeCircles } from './controllers/socialController';

const PORT = parseInt(process.env.PORT || '5000');

// Server entry point - Syncing innovative features.
app.listen(PORT, '127.0.0.1', async () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
    await initializeCircles();
});

