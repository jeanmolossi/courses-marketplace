import crypto from 'crypto';
import path from 'path';
import multer from 'multer';

const tempFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  lessonsDir: path.resolve(tempFolder, 'lessons'),
  avatarDir: path.resolve(tempFolder, 'avatars'),
  directory: tempFolder,

  storage: multer.diskStorage({
    destination: tempFolder,
    filename(request, file, callback) {
      const originalName = file.originalname;
      const hashName = crypto.randomBytes(8).toString('hex');
      const fileName = `${hashName}-${originalName}`;
      const parsedName = fileName.replace(/ /gim, '');

      return callback(null, parsedName);
    },
  }),
};
