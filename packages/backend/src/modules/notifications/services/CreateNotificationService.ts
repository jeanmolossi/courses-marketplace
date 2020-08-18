import { inject, injectable } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import Notification from '../infra/typeorm/schemas/NotificationSchema';
import INotificationsRepository from '../repositories/INotificationsRepository';
import CreateNotificationDTO from '../dtos/CreateNotificationDTO';

@injectable()
export default class CreateNotificationService {
  constructor(
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    text,
    type,
    userId,
  }: CreateNotificationDTO): Promise<Notification> {
    const cacheKey = `FindUserNotifications:${userId}`;

    await this.cacheProvider.invalidate(cacheKey);

    const notification = await this.notificationsRepository.create({
      text,
      type,
      userId,
    });

    return notification;
  }
}
