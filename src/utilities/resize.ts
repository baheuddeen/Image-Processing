import sharp from 'sharp';
import isCashed from './isCached.js';
import { promises as fs } from 'fs';
import imageInfo from './types.js';
import path from 'path';

const imagesDirPath = path.join(__dirname, '../../../static/assets/images');

export default async function resize(
  image: imageInfo
): Promise<{ path: string, isCashed: boolean }> {
  const result = new Promise<{ path: string, isCashed: boolean }>(
    (res, rej) => {
      fs.readFile(
        path.join(imagesDirPath, '/' + decodeURI(image.file_name) + image.ext)
      )
        .then((originalImage) => {
          const newImageName =
            decodeURI(image.file_name) +
            '_' +
            image.width +
            '_' +
            image.height +
            image.ext;
          isCashed(newImageName)
            .then(() => {
              res({
                path: 'assets/images/resizedImages/' + newImageName,
                isCashed: true,
              });
            })
            .catch(() => {
              sharp(originalImage)
                .resize({
                  width: image.width,
                  height: image.height,
                  fit: 'fill',
                })
                .toBuffer()
                .then(async (data) => {
                  await fs.writeFile(
                    path.join(imagesDirPath, '/resizedImages/', newImageName),
                    data
                  );
                  res({
                    path: 'assets/images/resizedImages/' + newImageName,
                    isCashed: false,
                  });
                })
                .catch((err) =>
                  rej('this image is not exist please upload it first')
                );
            });
        })
        .catch((err) => {
          rej('This image is not exist');
        });
    }
  );

  return result;
}
