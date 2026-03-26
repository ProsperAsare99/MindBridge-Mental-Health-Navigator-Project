import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
export declare const updateOnboarding: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getOnboardingStatus: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
