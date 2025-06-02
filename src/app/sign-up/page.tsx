import { CardCompact } from "@/components/card-compact";
import { signInPath } from "@/paths";
import Link from "next/link";
import { SignUpForm } from "@/features/auth/components/sign-up-form";

const SignUpPage = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <CardCompact
        className="animate-fade-in-from-top"
        title="Sign Up"
        description="Create an account to get started."
        content={<SignUpForm/>}
        footer={
          <Link className="text-sm text-muted-foreground" href={signInPath()}>Have an account? Sign In now.</Link>
        }
      />
    </div>
  );
};
export default SignUpPage;
