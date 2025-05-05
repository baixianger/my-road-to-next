import { Ticket } from '@/features/ticket/types';

// Initialize the array with the correct type
export const tickets: Ticket[] = [];

for (let i = 1; i <= 100; i++) {
    tickets.push({
        id: `${i}`,
        title: `Ticket ${i}`,
        description: `This is the description for ticket ${i}`,
        status: i % 4 === 0 ? 'CLOSED' as const : i % 3 === 0 ? 'RUNNING' as const : i % 2 === 0 ? 'DONE' as const : 'OPEN' as const,
        priority: ['LOW', 'MEDIUM', 'HIGH'][i % 3] as 'LOW' | 'MEDIUM' | 'HIGH'
    });
}