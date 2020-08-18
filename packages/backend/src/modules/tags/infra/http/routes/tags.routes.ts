import { Router } from 'express';

import TagsController from '../controllers/TagsController';

const tagsController = new TagsController();

const tagsRoutes = Router();

tagsRoutes.post('/create', tagsController.create);
tagsRoutes.get('/show', tagsController.show);

export default tagsRoutes;
