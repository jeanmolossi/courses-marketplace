import { Router } from 'express';

import usersModuleRoutes from '@modules/users/infra/http/routes';
import classesModuleRoutes from '@modules/classes/infra/http/routes';
import modulesModuleRoutes from '@modules/modules/infra/http/routes';
import lessonsModuleRoutes from '@modules/lessons/infra/http/routes';
import topicsModuleRoutes from '@modules/topics/infra/http/routes';
import tagsModuleRoutes from '@modules/tags/infra/http/routes';
import notificationsModuleRoutes from '@modules/notifications/infra/http/routes';
import engagementModuleRoutes from '@modules/engagement/infra/http/routes';

import RequireAuth from '../middlewares/RequireAuth';

const appRoutes = Router();

appRoutes.use('/', usersModuleRoutes);

appRoutes.use(RequireAuth);

appRoutes.use('/', classesModuleRoutes);
appRoutes.use('/', modulesModuleRoutes);
appRoutes.use('/', lessonsModuleRoutes);
appRoutes.use('/', topicsModuleRoutes);
appRoutes.use('/', tagsModuleRoutes);
appRoutes.use('/', notificationsModuleRoutes);
appRoutes.use('/', engagementModuleRoutes);

export default appRoutes;
