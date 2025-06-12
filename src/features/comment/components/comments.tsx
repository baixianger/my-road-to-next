"use server";
import { getComments } from "../queries/get-comments";
import { CommentItem } from "./comment-item";

type CommentsProps = {
  ticketId: string;
};

const Comments = async ({ ticketId }: CommentsProps) => {
  const comments = await getComments(ticketId);
  return (
    <div className="flex flex-col gap-y-2 mr-10">
      <p className="text-center py-4">Comments</p>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export { Comments };
