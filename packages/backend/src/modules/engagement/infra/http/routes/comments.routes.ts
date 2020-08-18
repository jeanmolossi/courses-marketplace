import { Router } from 'express';

import CommentsController from '../controllers/CommentsController';
import CommentController from '../controllers/CommentController';

const commentsController = new CommentsController();
const commentController = new CommentController();

const commentsRoutes = Router();

commentsRoutes.post('/create', commentsController.create);

commentsRoutes.get('/best/:topicId', commentController.index);

export default commentsRoutes;
