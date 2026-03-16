"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const zod_1 = require("zod");
const prisma_1 = __importDefault(require("../lib/prisma"));
// Define the schema for input validation
const createUserSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email format'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters long'),
    name: zod_1.z.string().optional(),
    institution: zod_1.z.string().optional(),
    studentId: zod_1.z.string().optional(),
    course: zod_1.z.string().optional(),
    phoneNumber: zod_1.z.string().optional(),
});
const createUser = async (req, res) => {
    try {
        // 1. Validate the incoming request body using Zod
        const validatedData = createUserSchema.safeParse(req.body);
        if (!validatedData.success) {
            res.status(400).json({
                error: 'Validation failed',
                details: validatedData.error.issues.map((e) => ({
                    field: e.path.join('.'),
                    message: e.message,
                })),
            });
            return;
        }
        const { email, password, name, institution, studentId, course, phoneNumber } = validatedData.data;
        // 2. Check if the user already exists in the database
        const existingUser = await prisma_1.default.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            res.status(409).json({ error: 'User with this email already exists' });
            return;
        }
        // 3. Hash the password before saving it
        const saltRounds = 10;
        const hashedPassword = await bcryptjs_1.default.hash(password, saltRounds);
        // 4. Create the new user in the database via Prisma
        const newUser = await prisma_1.default.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                institution,
                studentId,
                course,
                phoneNumber,
                isVerified: false, // Defaulting to false, they might need email verification
            },
        });
        // 5. Exclude the hashed password from the response
        const { password: _, ...userWithoutPassword } = newUser;
        res.status(201).json({
            message: 'User created successfully',
            user: userWithoutPassword,
        });
    }
    catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.createUser = createUser;
//# sourceMappingURL=userController.js.map