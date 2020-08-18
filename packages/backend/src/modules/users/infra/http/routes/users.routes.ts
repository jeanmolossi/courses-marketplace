import { Router } from 'express';

import RequireAuth from '@shared/infra/http/middlewares/RequireAuth';

import UsersController from '../controllers/UsersController';

const usersController = new UsersController();

const usersRouter = Router();

usersRouter.post('/create', usersController.create);
usersRouter.use(RequireAuth);
usersRouter.get('/show', usersController.show);

export default usersRouter;
