import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailSubcsriberSchema, EmailSubscriberModel } from './email-subscriber.model';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMQOptions } from '@project/util/util-core';
import { EmailSubscriberController } from './email-subscriber.controller';
import { EmailSubscriberService } from './email-subscriber.service';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: EmailSubscriberModel.name,
      schema: EmailSubcsriberSchema,
    }]),
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('application.rabbit'),
    ),
    MailModule,
  ],
  controllers: [EmailSubscriberController],
  providers: [
    EmailSubscriberService,
    EmailSubscriberRepository,
    EmailSubscriberController,
  ],
})
export class EmailSubscriberModule { }
