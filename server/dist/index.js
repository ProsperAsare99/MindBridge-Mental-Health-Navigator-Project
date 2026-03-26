"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const socialController_1 = require("./controllers/socialController");
const gamificationController_1 = require("./controllers/gamificationController");
console.log('[DEBUG] Imports complete');
const PORT = parseInt(process.env.PORT || '5000');
// Server entry point - Syncing innovative features.
const HOST = '0.0.0.0';
console.log(`[DEBUG] Attempting to listen on ${HOST}:${PORT}...`);
app_1.default.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
    // Background initialization - don't block the server startup
    console.log(`[SERVER] Initializing background tasks...`);
    (0, socialController_1.initializeCircles)().catch((error) => {
        console.warn('[SERVER WARNING] Circles initialization failed:', error.message);
    });
    (0, gamificationController_1.initializeChallenges)().catch((error) => {
        console.warn('[SERVER WARNING] Challenges initialization failed:', error.message);
    });
});
//# sourceMappingURL=index.js.map