import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class UserRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '123',
  })
  @Expose()
  @Transform(({ obj }) => obj.id.toString())
  public id: string;

  @ApiProperty({
    description: 'User email',
    example: 'user@test.ru',
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'User first name',
    example: 'Name'
  })
  @Expose()
  public firstname: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Lastname'
  })
  @Expose()
  public lastname: string;

  @ApiProperty({
    description: 'User avatar path',
    example: '/path/user.png',
  })
  @Expose()
  public avatar: string
}
