export default interface VoteDTO {
  type: 'up' | 'down';
  commentId: string;
  userId: string;
}
