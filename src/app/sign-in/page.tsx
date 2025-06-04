"use client";

import { CardCompact } from "@/components/card-compact";
import { passwordForgotPath, signInPath } from "@/paths";
import Link from "next/link";
import { SignInForm } from "@/features/auth/components/sign-in-form";

function SignInContent() {
  

  return (
    <CardCompact
      className="animate-fade-in-from-top"
      title="Sign In"
      description="Sign in to your account."
      content={<SignInForm />}
      footer={
        <>
          <Link className="text-sm text-muted-foreground" href={signInPath()}>
            No account yet?
          </Link>
          <Link
            className="text-sm text-muted-foreground"
            href={passwordForgotPath()}
          >
            Forgot password?
          </Link>
        </>
      }
    />
  );
}

const SignInPage = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <SignInContent />
    </div>
  );
};

export default SignInPage;
