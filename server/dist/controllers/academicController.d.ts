import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
export declare const getAcademicEvents: (req: AuthRequest, res: Response) => Promise<void>;
export declare const createAcademicEvent: (req: AuthRequest, res: Response) => Promise<void>;
