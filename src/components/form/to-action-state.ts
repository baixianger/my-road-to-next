import { ZodError } from "zod";


export type ActionState = {
  status?: "ERROR" | "SUCCESS";
  message: string;
  fieldErrors: Record<string, string[] | undefined>;
  payload?: FormData;
  timestamp: number;
};

export const EMPTY_ACTION_STATE: ActionState = {
  status: "ERROR",
  message: "",
  fieldErrors: {},
  timestamp: Date.now(),
}

export const fromErrorToActionState = (
  error: unknown,
  formData: FormData
): ActionState => {
  if (error instanceof ZodError) { // ZodError is a specific error type from the zod library
    return {
      status: "ERROR",
      message: "",//error.issues.map((issue) => issue.message).join(", "),
      fieldErrors: error.flatten().fieldErrors,
      payload: formData,
      timestamp: Date.now(),
    }
  } else if (error instanceof Error) { // Error is a built-in JavaScript error type
    return {
      status: "ERROR",
      message: error.message,
      fieldErrors: {},
      payload: formData,
      timestamp: Date.now(),
    }
  } else {
    return {
      status: "ERROR",
      message: "An unknown error occurred",
      fieldErrors: {},
      payload: formData,
      timestamp: Date.now(),
    }
  };
};

export const toActionState = (
  status: ActionState["status"],
  message: string
): ActionState => {
  return {
    status,
    message,
    fieldErrors: {},
    timestamp: Date.now(),
  };
}
