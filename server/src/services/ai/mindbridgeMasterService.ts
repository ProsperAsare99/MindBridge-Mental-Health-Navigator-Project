import { contextEngine } from './contextEngineService';
import { conversationManager } from './conversationManagerService';
import { modelRouter } from './modelRouterService';
import { promptBuilder } from './promptBuilderService';
import { geminiAdvanced } from './geminiAdvancedService';
import { safetyModerator } from './safetyModeratorService';
import { memoryManager } from './memoryManagerService';

export class MindBridgeMasterService {
    
    /**
     * Orchestrate the entire AI interaction flow with deep context, safety guardrails, and proactivity
     */
    async processUserMessage(userId: string, message: string, liveData?: any) {
        const startTime = Date.now();
        try {
            // 1. Initial Safety Moderation
            const moderation = await safetyModerator.moderateInput(userId, message);
            
            // 2. Build Context
            const context = await contextEngine.buildContext(userId, { ...liveData, message });
            
            // Handle Immediate Crisis
            if (moderation.crisis) {
                return await this.handleCrisis(userId, message, moderation, context);
            }

            // 3. Select Model
            const history = await conversationManager.getRecentHistory(userId);
            const complexity = modelRouter.calculateComplexity(message, {
                hasPreviousAssessments: true, 
                hasJournalHistory: true
            });

            const modelSelection = modelRouter.selectModel({
                conversationLength: history.length,
                userRiskLevel: context.clinical.riskAssessment.level,
                messageComplexity: complexity,
                requiresAnalysis: history.length % 5 === 0,
                crisisDetected: false,
                emotionalIntensity: moderation.emotionalState.intensity
            });

            // 4. Build Prompt
            const systemPrompt = promptBuilder.buildSystemPrompt(context);
            
            // Build history context
            const historyContext = history.length > 0
                ? history.map((chat: any) =>
                    `${chat.role === 'USER' ? (context.user.displayName || 'User') : 'The Oracle'}: ${chat.content}`
                  ).join('\n')
                : 'This is the start of the conversation.';

            const fullPrompt = `${systemPrompt}\n\n## HISTORY\n${historyContext}\n\n## NEW MESSAGE\n"${message}"\n\nTHE ORACLE'S RESPONSE:`;

            // 5. Generate AI Response
            const rawResponse = await geminiAdvanced.generateResponse(fullPrompt, modelSelection.model, userId);
            const responseTime = Date.now() - startTime;

            // 6. Post-Generation Safety Moderation
            const outputModeration = await safetyModerator.moderateOutput(rawResponse, {
                riskLevel: context.clinical.riskAssessment.level,
                crisis: false
            });

            const finalResponse = outputModeration.modified;

            // 7. Persist Interaction
            await conversationManager.saveInteraction(userId, message, finalResponse, {
                model: modelSelection.model.name,
                isCrisis: false,
                responseTime,
                emotionalIntensity: moderation.emotionalState.intensity,
                safetyFlags: moderation.flags.map((f: any) => f.type || f.category)
            });
            
            // 8. Semantic Memory Extraction (Extract facts every 5 messages)
            if ((history.length + 1) % 5 === 0) {
                const recentContext = [
                    ...history.slice(-4), 
                    { role: 'USER', content: message }, 
                    { role: 'ASSISTANT', content: finalResponse }
                ];
                memoryManager.extractAndSaveFromConversation(userId, recentContext).catch(err => 
                    console.error('[Memory Extraction Error]', err)
                );
            }

            // 9. Generate Suggested Actions
            const suggestedActions = this.generateSuggestedActions(finalResponse, context, moderation);

            return {
                response: finalResponse,
                model: modelSelection.model.name,
                reason: modelSelection.reason,
                isCrisis: false,
                safetyAlert: moderation.requiresIntervention,
                suggestedActions,
                responseTime
            };
        } catch (error) {
            console.error('[MindBridge Master Error]', error);
            return this.handleError(userId, error);
        }
    }

    private async handleCrisis(userId: string, message: string, moderation: any, context: any) {
        const crisisResponse = await this.generateCrisisResponse(userId, message, moderation, context);
        
        await conversationManager.saveInteraction(userId, message, crisisResponse.message, {
            model: 'crisis-protocol',
            isCrisis: true,
            emotionalIntensity: 10,
            safetyFlags: ['CRISIS_DETECTED']
        });

        return {
            ...crisisResponse,
            isCrisis: true,
            safetyAlert: true
        };
    }

    private async generateCrisisResponse(userId: string, message: string, moderation: any, context: any) {
        const user = context.user;
        const crisisPrompt = `
CRISIS INTERVENTION MODE
User ${user.displayName || 'Student'} is in distress: "${message}"
IMMEDIATE ACTIONS: Ask about safety, provide GHANA-SPECIFIC resources, encourage professional help.
Contacts: ${JSON.stringify(user.emergencyContacts || [])}
Keep response calm, clear, and focused on safety.`;

        const response = await geminiAdvanced.generateResponse(crisisPrompt, { name: 'gemini-1.5-pro' }, userId);
        
        return {
            message: response,
            resources: this.getCrisisResources(context.user.university),
            suggestedActions: [
                { type: 'CALL', label: 'Call Crisis Hotline: 112', action: 'tel:112', priority: 'CRITICAL' },
                { type: 'EMERGENCY_CONTACT', label: 'Contact Emergency Person', action: 'SHOW_CONTACTS', priority: 'HIGH' }
            ]
        };
    }

    private getCrisisResources(university: string) {
        const resources: any = {
            KNUST: { name: 'KNUST Counseling', number: '0322-060143' },
            UNIVERSITY_OF_GHANA: { name: 'UG Counseling', number: '0302-500381' },
            ASHESI_UNIVERSITY: { name: 'Ashesi Counseling', number: '0302-610330' }
        };
        return {
            national: [{ name: 'Ghana Emergency', number: '112' }, { name: 'Mental Health Authority', number: '0800-900-900' }],
            campus: resources[university] || { name: 'Campus Student Affairs', number: '112' }
        };
    }

    private generateSuggestedActions(response: string, context: any, moderation: any) {
        const actions = [];
        const msg = response.toLowerCase();
        
        if (msg.includes('mood') || msg.includes('feel')) actions.push({ type: 'MOOD', label: 'Log Mood', action: '/dashboard/mood', icon: 'smile' });
        if (msg.includes('breath') || msg.includes('anxious')) actions.push({ type: 'BREATHING', label: 'Breathe', action: '/tools/breathing', icon: 'wind' });
        if (msg.includes('journal') || msg.includes('write')) actions.push({ type: 'JOURNAL', label: 'Journal', action: '/dashboard/journal', icon: 'book' });
        
        if (context.clinical.riskAssessment.level === 'HIGH') {
            actions.push({ type: 'COUNSELOR', label: 'Talk to Counselor', action: '/dashboard/appointments', icon: 'user', priority: 'HIGH' });
        }
        
        return actions;
    }

    private async handleError(userId: string, error: any) {
        return {
            response: "I'm having a bit of trouble connecting right now. If this is urgent, please call 112 or your campus counseling center. I'm still here for you once I'm back online.",
            isError: true,
            suggestedActions: [{ type: 'CALL', label: 'Emergency: 112', action: 'tel:112', priority: 'CRITICAL' }]
        };
    }
}

export const mindBridgeMaster = new MindBridgeMasterService();
