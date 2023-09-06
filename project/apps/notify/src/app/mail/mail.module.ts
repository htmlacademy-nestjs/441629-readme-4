import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { getMailerAsyncOptions } from '@project/util/util-core';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRootAsync(getMailerAsyncOptions('application.mail')),
  ],
  providers: [
    MailService,
  ],
  exports: [
    MailService,
  ],
})
export class MailModule { }
