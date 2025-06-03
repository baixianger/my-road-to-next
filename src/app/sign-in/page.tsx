"use client";

import { CardCompact } from "@/components/card-compact";
import { passwordForgotPath, signInPath } from "@/paths";
import Link from "next/link";
import { SignInForm } from "@/features/auth/components/sign-in-form";
import { Suspense, useEffect } from "react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

function SignInContent() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");
  
  useEffect(() => {
    if (message === "Please sign in to access tickets") {
      toast.info(message);
    }
  }, [message]);

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
      <Suspense fallback={
        <CardCompact 
          title="Loading..." 
          description="Please wait" 
          content={<div className="h-40" />} 
        />
      }>
        <SignInContent />
      </Suspense>
    </div>
  );
};

export default SignInPage;
