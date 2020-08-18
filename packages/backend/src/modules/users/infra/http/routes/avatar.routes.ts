import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import AvatarController from '../controllers/AvatarController';

const avatarController = new AvatarController();

const avatarRoutes = Router();

const upload = multer({
  storage: uploadConfig.storage,
});

avatarRoutes.patch('/update', upload.single('avatar'), avatarController.update);

export default avatarRoutes;
