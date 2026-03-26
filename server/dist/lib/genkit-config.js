"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ai = void 0;
const genkit_1 = require("genkit");
const googleai_1 = require("@genkit-ai/googleai");
let _ai = null;
exports.ai = new Proxy({}, {
    get: (target, prop) => {
        if (!_ai) {
            console.log('[GENKIT] Lazy instantiating Genkit...');
            _ai = (0, genkit_1.genkit)({
                plugins: [(0, googleai_1.googleAI)({ apiKey: process.env.GEMINI_API_KEY })],
                model: 'googleai/gemini-1.5-flash',
            });
        }
        return _ai[prop];
    }
});
//# sourceMappingURL=genkit-config.js.map