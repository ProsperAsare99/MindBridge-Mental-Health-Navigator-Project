"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log('1. Dotenv configured');
console.log('1.5 Express app imported');
const socialController_1 = require("./controllers/socialController");
const gamificationController_1 = require("./controllers/gamificationController");
console.log('1.7 Background tasks imported');
const client_1 = require("@prisma/client");
console.log('2. PrismaClient class imported');
async function run() {
    try {
        const prisma = new client_1.PrismaClient();
        console.log('3. PrismaClient instantiated');
        console.log('3.5 Running background initializations...');
        await (0, socialController_1.initializeCircles)();
        console.log('3.6 Circles initialized');
        await (0, gamificationController_1.initializeChallenges)();
        console.log('3.7 Challenges initialized');
        console.log('4. Done');
    }
    catch (e) {
        console.error('ERROR:', e.message);
        console.error(e.stack);
    }
}
run();
//# sourceMappingURL=minimal_test.js.map