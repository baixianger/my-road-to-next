"use server";
import { CommentWithMetaData } from "../types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type CommentItemProps = {
  comment: CommentWithMetaData;
};
export const CommentItem = async ({ comment }: CommentItemProps) => {
  return (
    <div className="flex gap-x-2">
      <div className="pt-3">
        <Avatar>
          <AvatarFallback>
            {comment.user?.username[0].toUpperCase() ?? "Deleted User"}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="py-4 px-1 flex-1 flex flex-col gap-y-1 border-b">
        <div className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            {comment.user?.username ?? "Deleted User"}
          </p>
          <p className="text-xs text-muted-foreground">
            {comment.createdAt.toLocaleString()}
          </p>
        </div>
        <p className="whitespace-pre-line">{comment.content}</p>
      </div>
    </div>
  );
};
