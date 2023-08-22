import { Tag } from '@project/shared/app-types';
import { Entity } from '@project/util/util-types';

export class BlogTagEntity implements Entity<BlogTagEntity>, Tag {
  public id: number;
  public title: string;

  constructor(tag: Tag) {
    this.fillEntity(tag);
  }

  public fillEntity(entity: Tag) {
    this.title = entity.title;
    this.id = entity.tagId;
  }

  public toObject(): BlogTagEntity {
    return { ...this };
  }
}
