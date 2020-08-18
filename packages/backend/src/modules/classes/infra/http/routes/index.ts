import { Router } from 'express';

import classesRouter from './classes.routes';

const classesModuleRoutes = Router();

classesModuleRoutes.use('/classes', classesRouter);

export default classesModuleRoutes;
