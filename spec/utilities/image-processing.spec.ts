import resize from '../../src/utilities/resize.js';
import imageInfo from '../../src/utilities/types.js';

describe('image processing tool', () => {
  it('it should resize the image and return a JSON that include the new image path and check if it is cashed or not', async () => {
    const image: imageInfo = {
      file_name: 'fjord',
      width: 500,
      height: 500,
      ext: '.jpg',
    };
    const res = await resize(image);
    expect(res.path).toBeTruthy;
  });

  it('expected to return "This image is not exist"', async () => {
    const image: imageInfo = {
      file_name: 'image is not exist',
      width: 500,
      height: 500,
      ext: '.jpg',
    };

    try {
      const res = await resize(image);
      expect(res.path).toBeTruthy;
    } catch (err) {
      expect(err).toBe('This image is not exist');
    }
  });
});
