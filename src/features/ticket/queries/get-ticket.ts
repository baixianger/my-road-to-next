import { tickets } from "@/data";
import { Ticket } from "../types";

export const getTicket = async (ticketId: string): Promise<Ticket | null> => {
  // Simulate a network request with a delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // If an error occurs, you can throw an error here
  // throw new Error("Failed to fetch ticket");

  const maybeTicket = tickets.find((ticket) => ticket.id === ticketId);
  return new Promise((resolve) => {
    resolve(maybeTicket || null);
  });
};