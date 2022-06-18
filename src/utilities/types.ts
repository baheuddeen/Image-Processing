// eslint-disable-next-line @typescript-eslint/naming-convention
export default class imageInfo {
  file_name: string;

  width: number;

  height: number;

  ext: string;

  constructor(file_name: string, width: number, height: number, ext: string) {
    this.file_name = file_name;
    this.width = width;
    this.height = height;
    this.ext = ext;
  }

  static isMyType(obj: any): boolean {
    if (
      typeof obj.file_name == 'string' &&
      typeof obj.width == 'number' &&
      typeof obj.height == 'number' &&
      typeof obj.ext == 'string'
    )
      return true;
    else return false;
  }
}
