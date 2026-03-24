import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { initializeCircles } from './controllers/socialController';

const PORT = parseInt(process.env.PORT || '5000');

// Server entry point - Syncing innovative features.
app.listen(PORT, '0.0.0.0', async () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
    await initializeCircles();
});

