import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import resize from '../../../utilities/resize.js';
import imageInfo from '../../../utilities/types.js';

const router = express.Router();

router.post('/', bodyParser.json(), async (req: Request, res: Response) => {
  if (imageInfo.isMyType(req.body)) {
    const imageToResize = new imageInfo(
      req.body.file_name,
      req.body.width,
      req.body.height,
      req.body.ext
    );

    resize(imageToResize)
      .then((data) => {
        res.json({
          status: 'success',
          path: data.path,
          isCashed: data.isCashed,
        });
      })
      .catch((err) => {
        res.status(400).json({
          msg: err,
        });
      });
  } else {
    res.status(400).json({ msg: 'please enter valid body' });
  }
});

export default router;
