import { IsEmail, IsNotEmpty } from 'class-validator';
import { SUBSCRIBE_ERROR } from '../email-subscriber.constant';

export class CreateSubscriberDto {
  @IsEmail({}, { message: SUBSCRIBE_ERROR.EMAIL_NOT_VALID })
  public email: string;

  @IsNotEmpty({ message: SUBSCRIBE_ERROR.FIRST_NAME_IS_EMPTY })
  public firstname: string;

  @IsNotEmpty({ message: SUBSCRIBE_ERROR.LAST_NAME_IS_EMPTY })
  public lastname: string;
}
