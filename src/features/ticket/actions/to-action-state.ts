import { ZodError } from "zod";


export type ActionState = {
  message: string;
  fieldErrors: Record<string, string[] | undefined>;
  payload?: FormData;
};

export const fromErrorToActionState = (
  error: unknown,
  formData: FormData
): ActionState => {
  if (error instanceof ZodError) { // ZodError is a specific error type from the zod library
    return {
      message: error.issues.map((issue) => issue.message).join(", "),
      fieldErrors: error.flatten().fieldErrors,
      payload: formData,
    }
  } else if (error instanceof Error) { // Error is a built-in JavaScript error type
    return {
      message: error.message,
      fieldErrors: {},
      payload: formData,
    } 
  } else {
    return {
      message: "An unknown error occurred",
      fieldErrors: {},
      payload: formData,
    }
  };
};
