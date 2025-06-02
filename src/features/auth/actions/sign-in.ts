"use server";

import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/to-action-state";
import { ticketsPath } from "@/paths";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/auth/auth";
import { setSessionTokenCookie } from "@/lib/auth/cookies";
import { verify } from "@node-rs/argon2";
import { generateSessionToken } from "@/lib/auth/utils";


const signInSchema = z.object({
  email: z.string()
    .email("Invalid email address"),
  password: z.string()
    .min(6, "Password must be at least 6 characters long")
    .max(32, "Password must be at most 32 characters long"),
});

const signIn = async (_actionState: ActionState, formData: FormData) => {
  try {
    const { email, password } = signInSchema.parse(
      Object.fromEntries(formData.entries())
    );

    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return toActionState("ERROR", "Incorrect email or password", formData);
    }

    const validPassword = await verify(user.passwordHash, password);
    if (!validPassword) {
      return toActionState("ERROR", "Incorrect email or password", formData);
    }

    const sessionToken = generateSessionToken();
    const session = await createSession(user.id, sessionToken);
    await setSessionTokenCookie(sessionToken, session.expiresAt);
    
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }


  redirect(ticketsPath());
};

export { signIn };