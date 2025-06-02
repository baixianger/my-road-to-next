"use server";

import { redirect } from "next/navigation";
import { invalidateSession, invalidateAllSessions } from "@/lib/auth/auth";
import { signInPath } from "@/paths";
import { getCurrentSession } from "@/lib/auth/cookies";
import { deleteSessionTokenCookie } from "@/lib/auth/cookies";

export const signOut = async () => {

  const {session, user }= await getCurrentSession();

  if (session === null) {
    redirect(signInPath());
  }

  await invalidateSession(session.id);
  await invalidateAllSessions(user.id);
  await deleteSessionTokenCookie();

  redirect(signInPath());
};