import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import INotificationsRepository from '../repositories/INotificationsRepository';
import Notification from '../infra/typeorm/schemas/NotificationSchema';

@injectable()
export default class FindUserNotificationsService {
  constructor(
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(userId: string): Promise<Notification[]> {
    const cacheKey = `FindUserNotifications:${userId}`;
    let findUsersNotifications = await this.cacheProvider.recover<
      Notification[]
    >(cacheKey);

    if (!findUsersNotifications) {
      findUsersNotifications = await this.notificationsRepository.findByUser(
        userId,
      );

      await this.cacheProvider.save(cacheKey, findUsersNotifications);
    }

    return findUsersNotifications;
  }
}
