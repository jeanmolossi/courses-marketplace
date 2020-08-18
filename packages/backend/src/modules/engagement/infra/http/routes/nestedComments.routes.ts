import { Router } from 'express';

import NestedCommentsController from '../controllers/NestedCommentsController';

const nestedCommentsController = new NestedCommentsController();

const nestedCommentsRoutes = Router();

nestedCommentsRoutes.post('/create', nestedCommentsController.create);

export default nestedCommentsRoutes;
