import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
import { ResourceService } from '../services/resourceService';

export const getNearbyResources = async (req: AuthRequest, res: Response) => {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
        return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    try {
        const resources = await ResourceService.getNearbyResources(
            parseFloat(lat as string),
            parseFloat(lng as string)
        );
        res.json(resources);
    } catch (error) {
        console.error('Error fetching nearby resources:', error);
        res.status(500).json({ error: 'Failed to fetch nearby resources' });
    }
};

export const getResourceById = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    try {
        const resource = await ResourceService.getResourceById(id as string);
        if (!resource) return res.status(404).json({ error: 'Resource not found' });
        res.json(resource);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch resource' });
    }
};
