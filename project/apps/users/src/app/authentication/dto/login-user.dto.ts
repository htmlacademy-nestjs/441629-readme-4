import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { AUTH_USER } from '../authentication.constant';

export class LoginUserDto {
  @ApiProperty({
    description: 'User uniq email',
    example: 'user@test.ru',
  })
  @IsEmail({}, { message: AUTH_USER.EMAIL_NOT_VALID })
  public email: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  @IsString()
  public password: string;
}
