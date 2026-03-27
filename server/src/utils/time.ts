import prisma from '../lib/prisma';

/**
 * Determines if the current date falls within a statistically high-stress period 
 * for university students (e.g., Midterms or Final Exams).
 * 
 * Fetches data from AcademicEvent table and considers events within a 7-day window.
 */
export const isHighStressPeriod = async (): Promise<boolean> => {
    const now = new Date();
    const rangeStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const rangeEnd = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    try {
        const events = await prisma.academicEvent.findMany({
            where: {
                date: {
                    gte: rangeStart,
                    lte: rangeEnd
                },
                importance: { gte: 3 } // High importance events like FINALS, MIDTERMS
            }
        });

        if (events.length > 0) return true;

        // Fallback to monthly mocks if no events found
        const month = now.getMonth(); 
        return month === 2 || month === 3; // March and April
    } catch (error) {
        console.error('Error checking stress period:', error);
        return false;
    }
};

/**
 * Formats the current system time into a human-readable context string.
 */
export const getTimeContext = (): string => {
    return new Date().toLocaleString('en-US', { 
        weekday: 'long', 
        hour: '2-digit', 
        minute: '2-digit',
        month: 'short',
        day: 'numeric'
    });
};
