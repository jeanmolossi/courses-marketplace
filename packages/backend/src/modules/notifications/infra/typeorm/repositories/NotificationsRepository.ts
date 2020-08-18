import { MongoRepository, getMongoRepository } from 'typeorm';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import CreateNotificationDTO from '@modules/notifications/dtos/CreateNotificationDTO';

import ToggleNotificationRequestDTO from '@modules/notifications/dtos/ToggleNotificationRequestDTO';
import AppError from '@shared/infra/http/errors/AppError';
import Notification from '../schemas/NotificationSchema';

export default class NotificationsRepository
  implements INotificationsRepository {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongoConnection');
  }

  public async findByUser(userId: string): Promise<Array<Notification>> {
    const userNotifications = await this.ormRepository.find({
      where: { userId },
      order: { created_at: 'DESC' },
    });

    return userNotifications;
  }

  public async create({
    text,
    type,
    userId,
  }: CreateNotificationDTO): Promise<Notification> {
    const notification = this.ormRepository.create({
      text,
      type,
      userId,
      read: false,
    });

    await this.ormRepository.save(notification);

    return notification;
  }

  public async toggleReadUnread({
    id,
    currentStatus,
  }: ToggleNotificationRequestDTO): Promise<Notification> {
    const notification = await this.ormRepository.findOne(id);
    if (!notification) throw new AppError('Notification not exists yet');

    notification.read = !currentStatus;

    await this.ormRepository.save(notification);

    return notification;
  }
}
