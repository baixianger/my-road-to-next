"use server"

import { getCurrentSession } from "@/lib/auth/cookies";
import { redirect } from "next/navigation";
import { signInPath } from "@/paths";
import { setCookieByKey } from "@/action/cookies";

export async function getAuthOrRedirect() {
  const session = await getCurrentSession();

  if (!session.user) {
    await setCookieByKey("toast", "Please sign in in order to continue...");
    redirect(signInPath());
  }

  return session;
}