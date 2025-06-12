"use server";

import {
  fromErrorToActionState,
  toActionState,
} from "@/components/form/to-action-state";
import { prisma } from "@/lib/prisma";
import { ticketPath } from "@/paths";
import { revalidatePath } from "next/cache";

export const createComment = async (
  userId: string,
  ticketId: string,
  content: string
) => {
  try {
    await prisma.comment.create({
      data: {
        ticketId,
        content,
        userId,
      },
    });
    revalidatePath(ticketPath(ticketId));
    return toActionState("SUCCESS", "Comment created successfully");
  } catch (error) {
    return fromErrorToActionState(error);
  }
};
