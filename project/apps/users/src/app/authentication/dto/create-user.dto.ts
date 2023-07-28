import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User unique address',
    example: 'user@test.ru',
  })
  public email: string;

  @ApiProperty({
    description: 'User first name',
    example: 'Name',
  })
  public firstname: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Lastname',
  })
  public lastname: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  public password: string;
}
