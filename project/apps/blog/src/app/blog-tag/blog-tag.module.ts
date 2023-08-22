import { Module } from '@nestjs/common';
import { BlogTagController } from './blog-tag.controller';
import { BlogTagService } from './blog-tag.service';
import { BlogTagRepository } from './blog-tag.repository';

@Module({
  imports: [],
  controllers: [BlogTagController],
  providers: [BlogTagService, BlogTagRepository],
  exports: [BlogTagRepository],
})
export class BlogTagModule { }
