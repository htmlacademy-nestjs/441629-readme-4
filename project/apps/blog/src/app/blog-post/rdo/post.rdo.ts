import { Tag } from '@project/shared/app-types';
import { Expose } from 'class-transformer';

export class PostRdo {
  @Expose()
  public id: string;

  @Expose()
  public postType: string;

  @Expose()
  public title: string;

  @Expose()
  public link: string;

  @Expose()
  public preview: string;

  @Expose()
  public text: string;

  @Expose()
  public author: string;

  @Expose()
  public photo: string;

  @Expose()
  public description: string;

  @Expose()
  public tags: Tag[];

  @Expose()
  public userId: string;

  @Expose()
  public comments: Comment[]

  @Expose()
  public publishAt: string;

  @Expose()
  public createdAt: string;
}
