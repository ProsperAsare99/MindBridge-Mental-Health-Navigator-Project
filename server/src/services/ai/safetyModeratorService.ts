export class SafetyModeratorService {
    
    private readonly crisisKeywords = [
        'suicide', 'self-harm', 'kill myself', 'end it all', 
        'die', 'hurt myself', 'don\'t want to live', 
        'better off dead', 'hopeless', 'giving up'
    ];

    /**
     * Detect crisis language in a message
     */
    detectCrisis(message: string): boolean {
        const msgLower = message.toLowerCase();
        return this.crisisKeywords.some(keyword => msgLower.includes(keyword));
    }

    /**
     * Moderate content (Placeholder for more complex safety logic if needed)
     */
    async moderate(content: string): Promise<{ safe: boolean; reason?: string }> {
        // Basic check for now (could integrate with Gemini safety API directly)
        const isCrisis = this.detectCrisis(content);
        if (isCrisis) {
            return { safe: false, reason: 'crisis_detected' };
        }
        return { safe: true };
    }
}

export const safetyModerator = new SafetyModeratorService();
