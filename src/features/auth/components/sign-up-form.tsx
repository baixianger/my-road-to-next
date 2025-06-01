"use client";

import { Form } from "@/components/form/form";
import { EMPTY_ACTION_STATE } from "@/components/form/to-action-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/features/auth/actions/sign-up";
import { FieldError } from "@/features/ticket/components/field-error";
import { useActionState } from "react";

const SignUpForm = () => {
  const [actionState, action] = useActionState(signUp, EMPTY_ACTION_STATE);

  return (
    <Form actionState={actionState} action={action}>
      <Label htmlFor="username">Username</Label>
      <Input name="username" placeholder="Username" required />
      <FieldError actionState={actionState} name={"username"} />

      <Input name="email" type="email" placeholder="Email" required />
      <FieldError actionState={actionState} name={"email"} />

      <Input name="password" type="password" placeholder="Password" required />
      <FieldError actionState={actionState} name={"password"} />

      <Input
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        required
      />
      <FieldError actionState={actionState} name={"confirmPassword"} />
      
      <Button type="submit">Sign Up</Button>
    </Form>
  );
};

export { SignUpForm };
