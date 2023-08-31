import { Expose, Transform } from 'class-transformer';

export class UploadedFileRdo {
  @Expose({ name: 'id' })
  @Transform(({ obj }) => obj.id.toString())
  public id: string;

  @Expose()
  public originalName: string;

  @Expose()
  public hashName: string;

  @Expose()
  public mimetype: string;

  @Expose()
  public size: number;

  @Expose()
  public path: string;
}
