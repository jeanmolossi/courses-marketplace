import { Response, Request } from 'express';
import { container } from 'tsyringe';

import CreateNotificationService from '@modules/notifications/services/CreateNotificationService';
import FindUserNotificationsService from '@modules/notifications/services/FindUserNotificationsService';
import UpdateNotificationReadStatusService from '@modules/notifications/services/UpdateNotificationReadStatusService';
import singleUserEmitEvent from '@shared/utils/singleUserEmitEvent';

export default class NotficiationsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { text, type, userId } = request.body;

    const createNotification = container.resolve(CreateNotificationService);
    const notification = await createNotification.execute({
      text,
      type,
      userId,
    });

    singleUserEmitEvent('@notification:create', userId, request, notification);

    return response.json(notification);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id, read } = request.body;

    const updateReadStatus = container.resolve(
      UpdateNotificationReadStatusService,
    );
    const notificationUpdated = await updateReadStatus.execute({
      id,
      readStatus: read,
    });

    singleUserEmitEvent(
      '@notification:update',
      request.user.id,
      request,
      notificationUpdated,
    );

    return response.json(notificationUpdated);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const findUsersNotification = container.resolve(
      FindUserNotificationsService,
    );
    const notifications = await findUsersNotification.execute(userId);

    return response.json(notifications);
  }
}
