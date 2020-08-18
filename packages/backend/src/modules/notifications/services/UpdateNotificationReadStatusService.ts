import { injectable, inject } from 'tsyringe';
import { ObjectID } from 'typeorm';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationsRepository from '../repositories/INotificationsRepository';
import Notification from '../infra/typeorm/schemas/NotificationSchema';

interface Request {
  id: ObjectID;
  readStatus: boolean;
}

@injectable()
export default class UpdateNotificationReadStatusService {
  constructor(
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id, readStatus }: Request): Promise<Notification> {
    const notificationUpdated = await this.notificationsRepository.toggleReadUnread(
      {
        id,
        currentStatus: readStatus,
      },
    );

    const cacheKey = `FindUserNotifications:${notificationUpdated.userId}`;

    await this.cacheProvider.invalidate(cacheKey);

    return notificationUpdated;
  }
}
