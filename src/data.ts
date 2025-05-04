// Define the Ticket type
type Ticket = {
    id: string;
    title: string;
    description: string;
    status: 'open' | 'closed';
    priority: 'low' | 'medium' | 'high';
  };
  
  // Initialize the array with the correct type
  export const tickets: Ticket[] = [];
  
  for (let i = 1; i <= 100; i++) {
    tickets.push({
      id: `${i}`,
      title: `Ticket ${i}`,
      description: `This is the description for ticket ${i}`,
      status: i % 2 === 0 ? 'open' : 'closed',
      priority: ['low', 'medium', 'high'][i % 3] as 'low' | 'medium' | 'high',
    });
  }