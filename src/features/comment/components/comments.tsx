"use server";
import { getComments } from "../queries/get-comments";
import { CommentItem } from "./comment-item";
import { CommentCreateForm } from "./comment-create-form";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-redirect";

type CommentsProps = {
  ticketId: string;
};

const Comments = async ({ ticketId }: CommentsProps) => {
  const { user } = await getAuthOrRedirect();
  const comments = await getComments(ticketId);
  return (
    <div className="flex flex-col gap-y-2 mr-10">
      <p className="text-center pt-12">Comments</p>
      <CommentCreateForm
        ticketId={ticketId}
        userId={user.id}
        userName={user.username}
      />

      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export { Comments };
