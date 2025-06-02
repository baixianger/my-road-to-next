"use server";

import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/to-action-state";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { createSession } from "@/lib/auth/auth";
import { hashPassword, generateSessionToken } from "@/lib/auth/utils";
import { setSessionTokenCookie } from "@/lib/auth/cookies";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import { ticketsPath } from "@/paths";

type PasswordMatchInput = {
  password: string;
  confirmPassword: string;
};

const passwordMatch = ({ password, confirmPassword }: PasswordMatchInput, ctx: z.RefinementCtx) => {
  if (password !== confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });
  }
};

const signUpSchema = z.object({
  username: z.string()
    .min(3, "Username must be at least 3 characters long"),
  email: z.string()
    .email("Invalid email address"),
  password: z.string()
    .min(6, "Password must be at least 6 characters long")
    .max(32, "Password must be at most 32 characters long"),
    // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,32}$/, "Password must contain at least one uppercase letter, one lowercase letter, and one number"),
  confirmPassword: z.string()
    .min(6, "Confirm Password must be at least 6 characters long")
    .max(32, "Confirm Password must be at most 32 characters long"),
})
  .superRefine(passwordMatch);

const signUp = async (_actionState: ActionState, formData: FormData) => {
  try {
    const { username, email, password } = signUpSchema.parse(
      Object.fromEntries(formData.entries())
    );

    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash,
      },
    });

    const sessionToken = generateSessionToken();
    const session = await createSession(user.id, sessionToken);
    await setSessionTokenCookie(session.id, session.expiresAt);


  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return toActionState(
        "ERROR",
        "Either email or username is already in use",
        formData
      );
    }

    return fromErrorToActionState(error, formData);
  }

  redirect(ticketsPath());
};

export { signUp };