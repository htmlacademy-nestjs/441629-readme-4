import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { BlogController } from './blog.controller';
import { UsersController } from './users.controller';
import { HTTP_CLIENT } from './app.config';
import { CheckAuthGuard } from './guards/check-auth.guard';

@Module({
  imports: [
    HttpModule.register({
      timeout: HTTP_CLIENT.TIMEOUT,
      maxRedirects: HTTP_CLIENT.MAX_REDIRECTS,
    })
  ],
  controllers: [
    BlogController,
    UsersController,
  ],
  providers: [
    CheckAuthGuard,
  ],
})
export class AppModule { }
