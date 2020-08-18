import { Router } from 'express';

import ModulesController from '../controllers/ModulesController';

const modulesController = new ModulesController();

const modulesRouter = Router();

modulesRouter.post('/create', modulesController.create);
modulesRouter.get('/show', modulesController.show);

export default modulesRouter;
