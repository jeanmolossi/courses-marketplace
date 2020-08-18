import { Router } from 'express';

import NotificationsController from '../controllers/NotificationsController';

const notificationsController = new NotificationsController();

const notificationRoutes = Router();

notificationRoutes.get('/me', notificationsController.show);
notificationRoutes.post('/create', notificationsController.create);
notificationRoutes.put('/update', notificationsController.update);

export default notificationRoutes;
