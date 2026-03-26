import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
export declare const createAssessment: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getUserAssessments: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
