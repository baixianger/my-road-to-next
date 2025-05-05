// Define the TicketStatus type
type TicketStatus = 'OPEN' | 'DONE' | 'RUNNING' | 'CLOSED';

// Define the TicketPriority type
type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH';

// Define the Ticket type
export type Ticket = {
    id: string;
    title: string;
    description: string;
    status: TicketStatus;
    priority: TicketPriority;
  };
