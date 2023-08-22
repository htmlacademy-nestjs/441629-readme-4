import { Module } from '@nestjs/common';
import { BlogTagModule } from '../blog-tag/blog-tag.module';
import { BlogPostController } from './blog-post.controller';
import { BlogPostService } from './blog-post.service';
import { BlogPostRepository } from './blog-post.repository';

@Module({
  imports: [BlogTagModule],
  controllers: [BlogPostController],
  providers: [BlogPostService, BlogPostRepository],
})
export class BlogPostModule { }
