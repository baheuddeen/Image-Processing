import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import resize from '../../../utilities/resize.js';
import imageInfo from '../../../utilities/types.js';

const router = express.Router();

router.post(
  '/:fileName',
  bodyParser.json(),
  async (req: Request, res: Response) => {
    try {
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
          .catch(() => {
            res.status(400).json({
              msg: 'no image saved with this name and extention please use the upload the image first',
            });
          });
      } else {
        const imageParams = req.params.fileName.split('/').pop();
        const params = imageParams?.split('_');
        if (params?.length != 3) {
          res.status(400).json({
            msg: 'please enter valid params formated "imageName_width_height.etx"',
          });
          return;
        }

        const fileName = params[0];
        const width = +params[1];
        const height = +params[2].split('.')[0];

        if (!width || !height) {
          res.status(400).json({ msg: 'please enter valid width and height' });
          return;
        }

        if (params[2].split('.').length != 2) {
          res.status(400).json({
            msg: 'please enter valid params formated "imageName_width_height.etx"',
          });
          return;
        }
        const ext = '.' + params[2].split('.')[1];

        const imageToResize = new imageInfo(fileName, width, height, ext);

        //res.json(imageToResize);

        resize(imageToResize)
          .then((path) => {
            res.json({
              status: 'success',
              path: path,
            });
          })
          .catch(() => {
            res.status(400).json({
              msg: 'no image saved with this name and extention please use the upload the image first',
            });
          });
      }
    } catch (error) {
      res.status(400).json({ msg: "can't resize the image" });
    }
  }
);

export default router;
