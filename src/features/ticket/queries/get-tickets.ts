import { tickets } from "@/data";
import { Ticket } from "@/features/ticket/types";

export const getTickets = async (): Promise<Ticket[]> => {
  // Simulate a network request with a delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // If an error occurs, you can throw an error here
  // throw new Error("Failed to fetch ticket");

  return new Promise((resolve) => {
      resolve(tickets);
  });
}