"use client";

import { Form } from "@/components/form/form";
import { EMPTY_ACTION_STATE } from "@/components/form/to-action-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "@/features/auth/actions/sign-in";
import { FieldError } from "@/features/ticket/components/field-error";
import { useActionState } from "react";

const SignInForm = () => {
  const [actionState, action] = useActionState(signIn, EMPTY_ACTION_STATE);

  return (
    <Form actionState={actionState} action={action}>

      <Input name="email" type="email" placeholder="Email" defaultValue={actionState.payload?.get("email") as string} required />
      <FieldError actionState={actionState} name={"email"} />

      <Input name="password" type="password" placeholder="Password" defaultValue={actionState.payload?.get("password") as string} required />
      <FieldError actionState={actionState} name={"password"} />

      <Button type="submit">Sign In</Button>
    </Form>
  );
};

export { SignInForm };
