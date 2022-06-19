import { promises as fs } from 'fs';
import path from 'path';

const imagesResizedDirPath = path.join(
  __dirname,
  '../../../static/assets/images/resizedImages'
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
