"use server";
import { prisma } from "@/lib/prisma";
import { CommentWithMetaData } from "../types";

export const getComments = async (
  ticketId: string
): Promise<CommentWithMetaData[]> => {
  const comments = await prisma.comment.findMany({
    where: {
      ticketId,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return comments;
};
