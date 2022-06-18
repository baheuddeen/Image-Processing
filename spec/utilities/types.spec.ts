import imageInfo from '../../src/utilities/types.js';

describe('Checking the image type', () => {
  it('expected {file_name: "test", width: 500, height: 500, ext:".png"} to be a vaild imageInfo', () => {
    const image = {
      file_name: 'test',
      width: 500,
      height: 500,
      ext: '.png',
    };
    expect(imageInfo.isMyType(image)).toBeTrue();
  });

  it('expected {file_name: "test", width: "500", height: 500, ext:".png"} to be an unvalid imageInfo', () => {
    const image = {
      file_name: 'test',
      width: '500',
      height: 500,
      ext: '.png',
    };
    expect(imageInfo.isMyType(image)).toBeFalse();
  });

  it('expected {file_name: "test", width: "500", ext:".png"} to be an unvalid imageInfo', () => {
    const image = {
      file_name: 'test',
      width: 500,
      ext: '.png',
    };
    expect(imageInfo.isMyType(image)).toBeFalse();
  });
});
