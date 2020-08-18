import { Router } from 'express';

import lessonsRouter from './lessons.routes';

const lessonsModuleRoutes = Router();

lessonsModuleRoutes.use('/lessons', lessonsRouter);

export default lessonsModuleRoutes;
