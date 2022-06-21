import express, { Request, Response } from 'express';
import { promises as fs } from 'fs';
import path from 'path';

const imagesDirPath = path.join(
  __dirname,
  '../../../../../static/assets/images'
);

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const imagesList = await fs.readdir(imagesDirPath);
    res.json({
      imagesList: imagesList,
    });
  } catch (error) {
    res.status(400).json({ msg: "can't read the directory" });
  }
});

export default router;
