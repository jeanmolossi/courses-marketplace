import { Router } from 'express';

import notificationRoutes from './notification.routes';

const notificationsModuleRoutes = Router();

notificationsModuleRoutes.use('/notifications', notificationRoutes);

export default notificationsModuleRoutes;
