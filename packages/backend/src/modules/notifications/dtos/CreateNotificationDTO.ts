export default interface CreateNotificationDTO {
  text: string;
  type: 'forum' | 'lesson';
  userId: string;
}
