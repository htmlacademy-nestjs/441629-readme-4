import { Comment, Post, Tag } from '@project/shared/app-types';
import { Entity } from '@project/util/util-types';

export class BlogPostEntity implements Entity<BlogPostEntity>, Post {
  public id: number;
  public postType: string;
  public title: string;
  public link: string;
  public preview: string;
  public text: string;
  public author?: string;
  public photo?: string;
  public description: string;
  public tags: Tag[];
  public userId: string;
  public comments: Comment[];
  public createdAt: Date;
  public publishAt: Date;

  constructor(post: Post) {
    this.fillEntity(post);
  }

  public fillEntity(entity: Post): void {
    this.postType = entity.postType;
    this.title = entity.title;
    this.link = entity.link;
    this.preview = entity.preview;
    this.text = entity.text;
    this.author = entity.author;
    this.photo = entity.photo;
    this.description = entity.description;
    this.tags = [...entity.tags];
    this.userId = entity.userId;
    this.comments = [];
    this.createdAt = new Date();
    this.publishAt = entity.publishAt;
  }

  public toObject(): BlogPostEntity {
    return {
      ...this,
      tags: [...this.tags],
      comments: [...this.comments],
    };
  }
}
