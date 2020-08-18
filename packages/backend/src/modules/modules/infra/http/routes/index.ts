import { Router } from 'express';

import modulesRouter from './modules.routes';

const modulesModuleRoutes = Router();

modulesModuleRoutes.use('/modules', modulesRouter);

export default modulesModuleRoutes;
