import { User } from "@prisma/client";

type Entity = {
  userId: string | null;
}

export function isOwner(user: User | null, entity: Entity | null) {

  if (!entity || !user) {
    return false;
  }

  if (!entity.userId) {
    return false;
  }

  if (user.id !== entity.userId) {
    return false;
  }

  return true;
}