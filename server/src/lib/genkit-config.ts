import { genkit } from 'genkit';
import { googleAI, gemini15Flash } from '@genkit-ai/googleai';

let _ai: any = null;

export const ai = new Proxy({}, {
    get: (target, prop) => {
        if (!_ai) {
            console.log('[GENKIT] Lazy instantiating Genkit...');
            _ai = genkit({
                plugins: [googleAI({ apiKey: process.env.GEMINI_API_KEY })],
                model: gemini15Flash,
            });
        }
        return _ai[prop];
    }
}) as any;
