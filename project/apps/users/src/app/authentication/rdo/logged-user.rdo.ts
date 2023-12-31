import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class LoggedUserRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '64c8d7e47a6fe807ba600afb'
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
    description: 'Access token',
    example: 'user@test.ru',
  })
  @Expose()
  public accessToken: string;
}
