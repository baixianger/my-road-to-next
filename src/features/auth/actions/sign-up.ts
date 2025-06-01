"use server";

import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/to-action-state";
import { z } from "zod";

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
    .min(5, "Username must be at least 3 characters long"),
  email: z.string()
    .email("Invalid email address"),
  password: z.string()
    .min(6, "Password must be at least 6 characters long")
    .max(32, "Password must be at most 32 characters long")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,32}$/, "Password must contain at least one uppercase letter, one lowercase letter, and one number"),
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
    // TODO: store in database
  } catch (error) {
    return fromErrorToActionState(error);
  }

  return toActionState("SUCCESS", "Sign up successful!")
};

export { signUp };