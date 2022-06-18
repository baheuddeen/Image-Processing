import { promises as fs } from 'fs';
import path from 'path';

const __dirname = path.resolve();
const imagesResizedDirPath = path.join(
  __dirname,
  'src/static/assets/images/resizedImages'
);

export default async function isCashed(newImageName: string): Promise<boolean> {
  const found = new Promise<boolean>((res, rej) => {
    fs.readdir(imagesResizedDirPath).then((imagesList) => {
      if (imagesList.indexOf(newImageName) != -1) {
        res(true);
      } else {
        rej(false);
      }
    });
  });
  return found;
}
