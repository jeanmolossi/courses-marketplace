import { Router } from 'express';

import multer from 'multer';

import uploadConfig from '@config/upload';
import VideoController from '../controllers/VideoController';
import LessonsController from '../controllers/LessonsController';

const lessonsController = new LessonsController();
const videoController = new VideoController();

const lessonsRouter = Router();

lessonsRouter.post('/create', lessonsController.create);
lessonsRouter.get('/show', lessonsController.show);
lessonsRouter.get('/index/:id', lessonsController.index);

const upload = multer({
  storage: uploadConfig.storage,
});

lessonsRouter.patch('/video', upload.single('video'), videoController.update);

export default lessonsRouter;
