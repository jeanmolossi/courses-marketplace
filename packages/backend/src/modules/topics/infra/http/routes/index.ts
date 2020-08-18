import { Router } from 'express';

import topicsRoutes from './topics.routes';

const topicsModuleRoutes = Router();

topicsModuleRoutes.use('/topics', topicsRoutes);

export default topicsModuleRoutes;
