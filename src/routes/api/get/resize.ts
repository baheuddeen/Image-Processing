import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import resize from '../../../utilities/resize.js';
import imageInfo from '../../../utilities/types.js';
import path from 'path';

const router = express.Router();

router.get(
  '/:fileName',
  bodyParser.json(),
  async (req: Request, res: Response) => {
    const imageParams = req.params.fileName.split('/').pop();
    const params = imageParams?.split('_');
    if (params?.length != 3) {
      res.status(400).json({
        msg: 'Missing filename, height or width"',
      });
      return;
    }

    const fileName = params[0];
    const width = +params[1];
    const height = +params[2].split('.')[0];

    if (!width || !height) {
      res.status(400).json({ msg: 'invalid input for height or weight' });
      return;
    }

    if (params[2].split('.').length != 2) {
      res.status(400).json({
        msg: 'invalid image ext"',
      });
      return;
    }
    const ext = '.' + params[2].split('.')[1];

    const imageToResize = new imageInfo(fileName, width, height, ext);

    resize(imageToResize)
      .then((data) => {
        res.sendFile(path.join(path.resolve('./') + '/static/' + data.path));
      })
      .catch(() => {
        res.status(400).json({
          msg: 'no image saved with this name and extention please use the upload the image first',
        });
      });
  }
);

export default router;
