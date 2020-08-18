import { ObjectID } from 'typeorm';

import Notification from '../infra/typeorm/schemas/NotificationSchema';
import CreateNotificationDTO from '../dtos/CreateNotificationDTO';
import ToggleNotificationRequestDTO from '../dtos/ToggleNotificationRequestDTO';

export default interface INotificationsRepository {
  create(data: CreateNotificationDTO): Promise<Notification>;
  toggleReadUnread(data: ToggleNotificationRequestDTO): Promise<Notification>;
  findByUser(userId: string): Promise<Notification[]>;
}
