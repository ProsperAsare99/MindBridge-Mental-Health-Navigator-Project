"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAcademicEvent = exports.getAcademicEvents = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const getAcademicEvents = async (req, res) => {
    try {
        const events = await prisma_1.default.academicEvent.findMany({
            orderBy: { date: 'asc' }
        });
        res.json(events);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch academic events' });
    }
};
exports.getAcademicEvents = getAcademicEvents;
const createAcademicEvent = async (req, res) => {
    const { title, type, date, importance } = req.body;
    try {
        const event = await prisma_1.default.academicEvent.create({
            data: {
                title,
                type,
                date: new Date(date),
                importance: importance || 1
            }
        });
        res.status(201).json(event);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create academic event' });
    }
};
exports.createAcademicEvent = createAcademicEvent;
//# sourceMappingURL=academicController.js.map