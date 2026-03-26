import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

let _ai: any = null;

export const ai = new Proxy({}, {
    get: (target, prop) => {
        if (!_ai) {
            console.log('[GENKIT] Lazy instantiating Genkit...');
            _ai = genkit({
                plugins: [googleAI({ apiKey: process.env.GEMINI_API_KEY })],
                model: 'googleai/gemini-1.5-flash',
            });
        }
        return _ai[prop];
    }
}) as any;
