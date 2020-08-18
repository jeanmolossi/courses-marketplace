import { Router } from 'express';

import TopicsController from '../controllers/TopicsController';

const topicsController = new TopicsController();

const topicsRoutes = Router();

topicsRoutes.post('/create', topicsController.create);
topicsRoutes.get('/show', topicsController.show);
topicsRoutes.get('/index/:topicId', topicsController.index);

export default topicsRoutes;
