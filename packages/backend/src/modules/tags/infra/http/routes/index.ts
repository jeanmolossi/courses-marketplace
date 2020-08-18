import { Router } from 'express';

import tagsRoutes from './tags.routes';

const tagsModuleRoutes = Router();

tagsModuleRoutes.use('/tags', tagsRoutes);

export default tagsModuleRoutes;
