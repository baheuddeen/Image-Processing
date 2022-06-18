import express from 'express';
import { promises as fs } from 'fs';
import path from 'path';

const __dirname = path.resolve();
const imagesDirPath = path.join(__dirname, 'src/static/assets/images');
const router = express.Router();

router.get('/', async (req, res) => {
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
