import { ContextEngineService } from '../../services/ai/contextEngineService';
import { SafetyModeratorService } from '../../services/ai/safetyModeratorService';
import { ModelRouter } from '../../services/ai/modelRouterService';
import prisma from '../../lib/prisma';

// Mock Prisma
jest.mock('../../lib/prisma', () => ({
    __esModule: true,
    default: {
        user: { 
            findUnique: jest.fn(), 
            findFirst: jest.fn(), 
            create: jest.fn(), 
            delete: jest.fn(),
            update: jest.fn()
        },
        mood: { findMany: jest.fn() },
        assessment: { findMany: jest.fn() },
        chatMessage: { findMany: jest.fn() },
        academicEvent: { findMany: jest.fn() },
        aIInteraction: { count: jest.fn() },
        crisisLog: { create: jest.fn() },
        $disconnect: jest.fn(),
    },
}));

// Mock Generated Client Enums
jest.mock('../../generated/client', () => ({
    University: { KNUST: 'KNUST', UNIVERSITY_OF_GHANA: 'UNIVERSITY_OF_GHANA', OTHER: 'OTHER' },
    Language: { ENGLISH: 'ENGLISH', TWI: 'TWI' },
    SupportLevel: { SOMEWHAT: 'SOMEWHAT', HIGH: 'HIGH', LOW: 'LOW' },
    RiskLevel: { LOW: 'LOW', MODERATE: 'MODERATE', HIGH: 'HIGH', CRITICAL: 'CRITICAL' },
    FaithLevel: { SOMEWHAT_IMPORTANT: 'SOMEWHAT_IMPORTANT' },
    ApproachPreference: { HOLISTIC: 'HOLISTIC' },
    MessageRole: { USER: 'user', ASSISTANT: 'assistant' },
    AssessmentType: { PHQ9: 'PHQ9' },
}));

describe('AI Services Unit Tests', () => {
    let contextEngine: ContextEngineService;
    let safetyModerator: SafetyModeratorService;
    let modelRouter: ModelRouter;

    beforeAll(() => {
        contextEngine = new ContextEngineService();
        safetyModerator = new SafetyModeratorService();
        modelRouter = new ModelRouter();
    });

    const mockUserId = 'test-user-id';
    const mockUser = {
        id: mockUserId,
        email: 'test@mindbridge.test',
        displayName: 'Test Student',
        university: 'KNUST',
        academicLevel: 300,
        program: 'Computer Science',
        createdAt: new Date(),
        emergencyContacts: []
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('ContextEngineService', () => {
        it('should build comprehensive context for a user', async () => {
            (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
            (prisma.mood.findMany as jest.Mock).mockResolvedValue([
                { value: 4, createdAt: new Date() },
                { value: 3, createdAt: new Date() },
                { value: 5, createdAt: new Date() }
            ]);
            (prisma.assessment.findMany as jest.Mock).mockResolvedValue([]);
            (prisma.chatMessage.findMany as jest.Mock).mockResolvedValue([]);
            (prisma.academicEvent.findMany as jest.Mock).mockResolvedValue([]);

            const context = await contextEngine.buildContext(mockUserId);

            expect(context).toHaveProperty('user');
            expect(context.user.displayName).toBe('Test Student');
            expect(context.temporal.recentMoods.entryCount).toBe(3);
        });
    });

    describe('SafetyModeratorService', () => {
        it('should detect crisis language', async () => {
            const message = "I feel like giving up on life completely";
            // Mock counts for spam check
            (prisma as any).aIInteraction = { count: jest.fn().mockResolvedValue(0) };
            
            const result = await safetyModerator.moderateInput(mockUserId, message);
            expect(result.crisis).toBe(true);
            expect(result.safe).toBe(true); // crisis language isn't technically unsafe (blocked) yet unless it's inappropriate
        });

        it('should flag high emotional intensity', async () => {
            const message = "I am VERY EXTREMELY OVERWHELMED AND HOPELESS";
             (prisma as any).aIInteraction = { count: jest.fn().mockResolvedValue(0) };
            const result = await safetyModerator.moderateInput(mockUserId, message);
            expect(result.emotionalState.intensity).toBeGreaterThan(7);
        });
    });

    describe('ModelRouter', () => {
        it('should select PRO model for crisis', () => {
            const context = { 
                crisisDetected: true, 
                emotionalIntensity: 10,
                userRiskLevel: 'HIGH',
                conversationLength: 5,
                messageComplexity: 2,
                requiresAnalysis: false
            };
            const result = modelRouter.selectModel(context as any);
            expect(result.reason).toBe('crisis_protocol');
        });

        it('should calculate complexity', () => {
            const msg = "I'm overwhelmed and devastated and hopeless about everything.";
            const score = modelRouter.calculateComplexity(msg);
            expect(score).toBeGreaterThan(5);
        });
    });
});
