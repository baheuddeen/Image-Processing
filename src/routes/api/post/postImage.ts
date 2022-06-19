import express, { Request, Response } from 'express';
// import { promises as fs } from 'fs';
import multer from 'multer';
import path from 'path';

const imagesDirPath = path.join(
  __dirname,
  '../../../../../static/assets/images'
);

const upload = multer({
  limits: { fieldSize: 10 * 1024 * 1024 },
  storage: multer.diskStorage({
    filename: function (req, file, callback) {
      callback(null, file.originalname);
    },
    destination: function (req, file, callback) {
      callback(null, imagesDirPath);
    },
  }),
});

const router = express.Router();

router.post(
  '/',
  upload.single('image'),
  async (req: Request, res: Response) => {
    console.log(req.file, req.body);
    res.send('successeded');
  }
);

export default router;
