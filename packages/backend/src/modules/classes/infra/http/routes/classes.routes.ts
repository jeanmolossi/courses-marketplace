import { Router } from 'express';

import ClassesController from '../controllers/ClassesControllers';

const classesController = new ClassesController();

const classesRouter = Router();

classesRouter.post('/create', classesController.create);
classesRouter.get('/show', classesController.show);

export default classesRouter;
