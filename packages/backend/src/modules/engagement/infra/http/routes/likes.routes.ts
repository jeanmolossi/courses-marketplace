import { Router } from 'express';
import LikesController from '../controllers/LikesController';

const likeController = new LikesController();

const likesRoutes = Router();

likesRoutes.post('/like', likeController.create);
likesRoutes.delete('/unlike', likeController.delete);

export default likesRoutes;
