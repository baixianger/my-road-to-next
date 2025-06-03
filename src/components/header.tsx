"use client";
import { LucideKanban, LucideLogOut } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { homePath, ticketsPath, signInPath, signUpPath } from "@/paths";
import { ThemeSwitcher } from "./theme/theme-switcher";
import { SubmitButton } from "./form/submit-button";
import { signOut } from "@/features/auth/actions/sign-out";
import { useAuth } from "@/features/auth/hooks/use-auth";


const Header = () => {

  const {user, isFetched } = useAuth();

  if (!isFetched) {
    return null;
  }
 
  const navItems = user ? (
    <>
      <Link
        href={ticketsPath()}
        className={buttonVariants({ variant: "default" })}
      >
        Tickets
      </Link>
      <form action={signOut}>
        <SubmitButton icon={<LucideLogOut/>}/> {/* label="Sign Out" */}
      </form>
    </>
  ) : (
    <>
			<Link href={signInPath()} className={buttonVariants({ variant: "default" })}>
				Sign In
			</Link>
			<Link href={signUpPath()} className={buttonVariants({ variant: "outline" })}>
				Sign Up
			</Link>
    </>
  );

  return (
    <nav
      className="
				animate-header-from-top
				supports-backdrop-blur:bg-background/60 
				fixed top-0 left-0 right-0 z-20 
				border-b bg-background/95 backdrop-blur 
				w-full flex py-2.5 px-5 justify-between
				"
    >
      {/*此处safari和chrome表现不太一样，safari在内容没填充满页面时表现的行为时可以滚动而非fixed，只有溢出后才有固定的行为 */}
      <div className="flex align-items gap-x-2">
        <Button asChild variant="ghost">
          <Link href={homePath()}>
            <LucideKanban />
            <h1 className="ml-2 text-lg font-semibold">TicketBounty</h1>
          </Link>
        </Button>
      </div>
      <div className="flex align-items gap-x-2">
        <ThemeSwitcher />
        {navItems}
      </div>
    </nav>
  );
};

export { Header };
