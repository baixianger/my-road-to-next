/*
这是仿写lucia-auth的prisma适配器的代码
用于验证会话和用户信息
lucia-auth已经不再维护
*/
import { prisma } from "@/lib/prisma";
import type { User, Session } from "@prisma/client";
import { hashToken } from "./utils";

const SESSION_REFRESH_INTERVAL_MS = 1000 * 60 * 60 * 24 * 15; // 15 days
const SESSION_MAX_DURATION_MS = SESSION_REFRESH_INTERVAL_MS * 2; // 30 days

export async function createSession(
  userId: string,
  token: string
): Promise<Session> {
  const sessionId = hashToken(token);
  const session: Session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + SESSION_MAX_DURATION_MS),
  };
  await prisma.session.create({
    data: session,
  });

  return session;
}

// 提高安全性时，可以返回SessionGetPayload< >泛型
// export type TicketWithUser = Prisma.SessionGetPayload<{
//   include: {
//     user: {
//       select: {
//         username: true, // filter passwordHash
//       },
//     },
//   };
// }>; // 这样返回的user就过滤密码等敏感信息了。
export async function validateSessionToken(
  token: string
): Promise<SessionValidationResult> {
  const sessionId = hashToken(token);
  const result = await prisma.session.findUnique({
    where: {
      id: sessionId,
    },
    include: {
      user: true,
    },
  });

  // if there is no session, return null
  if (result === null) {
    return { session: null, user: null };
  }

  const { user, ...session } = result;

  // if the session is expired, delete it
  if (Date.now() >= session.expiresAt.getTime()) {
    // or your ORM of choice, here we use prisma
    await prisma.session.delete({ where: { id: sessionId } });
    return { session: null, user: null };
  }

  // if 15 days are left until the session expires, refresh the session
  if (Date.now() >= session.expiresAt.getTime() - SESSION_REFRESH_INTERVAL_MS) {
    session.expiresAt = new Date(Date.now() + SESSION_MAX_DURATION_MS);
    await prisma.session.update({
      where: {
        id: session.id,
      },
      data: {
        expiresAt: session.expiresAt,
      },
    });
  }
  return { session, user };
}

export async function invalidateSession(sessionId: string): Promise<void> {
  await prisma.session.delete({ where: { id: sessionId } });
}

export async function invalidateAllSessions(userId: string): Promise<void> {
  await prisma.session.deleteMany({
    where: {
      userId: userId,
    },
  });
}

export type SessionValidationResult =
  | { session: Session; user: User }
  | { session: null; user: null };

/*  
Using your API
When a user signs in, generate a session token with generateSessionToken() and create a session linked to it with createSession().The token is provided to the user client.
  import { generateSessionToken, createSession } from "./session.js";

const token = generateSessionToken();
const session = createSession(token, userId);
setSessionTokenCookie(token);
Validate a user - provided token with validateSessionToken().
  import { validateSessionToken } from "./session.js";

const token = cookies.get("session");
if (token !== null) {
  const { session, user } = validateSessionToken(token);
}
*/
