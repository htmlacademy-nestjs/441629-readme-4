import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { BlogTagModule } from './blog-tag/blog-tag.module';
import { BlogPostModule } from './blog-post/blog-post.module';

@Module({
  imports: [PrismaModule, BlogTagModule, BlogPostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
