import { Router } from 'express';

import RequireAuth from '@shared/infra/http/middlewares/RequireAuth';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import avatarRoutes from './avatar.routes';

const usersModuleRoutes = Router();

usersModuleRoutes.use('/sessions', sessionsRouter);
usersModuleRoutes.use('/users', usersRouter);
usersModuleRoutes.use('/avatar', RequireAuth, avatarRoutes);

export default usersModuleRoutes;
