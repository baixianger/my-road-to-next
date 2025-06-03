"use server"

import { getCurrentSession } from "@/lib/auth/cookies";
import { redirect } from "next/navigation";
import { signInPath } from "@/paths";
import { setCookieByKey } from "@/action/cookies";

export async function getAuthRedirect() {
  const { user } = await getCurrentSession();

  if (!user) {
    // toast
    await setCookieByKey("toast", "Please sign in to access tickets");
    redirect(signInPath());
  }
}