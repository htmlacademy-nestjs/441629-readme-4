import { Comment } from './comment.interface';
import { Tag } from './tag.interface';

export interface Post {
  id?: number;
  postType: string;
  title?: string;
  link?: string;
  preview?: string;
  text?: string;
  author?: string;
  photo?: string;
  description?: string;
  tags?: Tag[];
  userId: string;
  comments: Comment[];
  createdAt?: Date;
  publishAt?: Date;
}
