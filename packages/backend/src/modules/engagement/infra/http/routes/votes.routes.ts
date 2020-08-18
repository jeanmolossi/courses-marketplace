import { Router } from 'express';
import VotesController from '../controllers/VotesController';

const votesController = new VotesController();

const votesRoutes = Router();

votesRoutes.post('/vote', votesController.create);
votesRoutes.delete('/unvote', votesController.delete);

export default votesRoutes;
