import { Comment } from "../models/Comment.model";

export function countAllReplies(comments: Comment[], parentId: number): number {
  const directReplies = comments.filter((comment) => comment.parentId === parentId);
  return directReplies.reduce(
    (acc, reply) => acc + 1 + countAllReplies(comments, reply.id),
    0
  );
}
