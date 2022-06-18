import sharp from 'sharp';
import isCashed from './isCached.js';
import { promises as fs } from 'fs';
import imageInfo from './types.js';
import path from 'path';

const __dirname = path.resolve();
const imagesDirPath = path.join(__dirname, 'src/static/assets/images');

export default async function resize(
  image: imageInfo
): Promise<{ path: string, isCashed: boolean }> {
  const originalImage = await fs.readFile(
    imagesDirPath + '/' + decodeURI(image.file_name) + image.ext
  );
  const newImageName =
    decodeURI(image.file_name) +
    '_' +
    image.width +
    '_' +
    image.height +
    image.ext;
  const result = new Promise<{ path: string, isCashed: boolean }>(
    (res, rej) => {
      isCashed(newImageName)
        .then(() => {
          res({ path: newImageName, isCashed: true });
        })
        .catch(() => {
          sharp(originalImage)
            .resize({
              width: image.width,
              height: image.height,
              fit: 'fill',
            })
            .toBuffer()
            .then((data) => {
              fs.writeFile(
                imagesDirPath + '/resizedImages/' + newImageName,
                data
              );
              res({ path: newImageName, isCashed: false });
            })
            .catch((err) =>
              rej('this image is not exist please upload it first')
            );
        });
    }
  );

  return result;
}
