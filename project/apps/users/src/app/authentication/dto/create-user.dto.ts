import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';
import { AUTH_USER, VALIDATION_USER } from '../authentication.constant';

export class CreateUserDto {
  @ApiProperty({
    description: 'User unique address',
    example: 'user@test.ru',
  })
  @IsEmail({}, { message: AUTH_USER.EMAIL_NOT_VALID })
  public email: string;

  @ApiProperty({
    description: 'User first name',
    example: 'Name',
  })
  @IsString()
  public firstname: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Lastname',
  })
  @IsString()
  public lastname: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  @IsString()
  @Length(
    VALIDATION_USER.MIN_PASS_LENGHT,
    VALIDATION_USER.MAX_PASS_LENGTH,
    { message: AUTH_USER.PASSWORD_LENGTH_WRONG }
  )
  public password: string;
}
