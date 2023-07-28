import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { BlogUserMemoryRepository } from '../blog-user/blog-user-memory.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRole } from '@project/shared/app-types';
import { BlogUserEntity } from '../blog-user/blog-user.entity';
import { AUTH_USER } from './authentication.constant';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly blogUserRepository: BlogUserMemoryRepository,
  ) { }

  public async register(dto: CreateUserDto) {
    const { email, firstname, lastname, password } = dto;

    const blogUser = {
      email,
      avatar: '',
      firstname,
      lastname,
      passwordHash: '',
      role: UserRole.User,
    }

    const existUser = await this.blogUserRepository.findByEmail(email);

    if (existUser) {
      throw new ConflictException(AUTH_USER.EXISTS);
    }

    const userEntity = await new BlogUserEntity(blogUser).setPassword(password);

    return this.blogUserRepository.create(userEntity);
  }

  public async verifyUser(dto: LoginUserDto) {
    const { email, password } = dto;

    const existUser = await this.blogUserRepository.findByEmail(email);
    if (!existUser) {
      throw new NotFoundException(AUTH_USER.NOT_FOUND);
    }

    const blogUserEnnity = new BlogUserEntity(existUser);
    if (!await blogUserEnnity.comparePassword(password)) {
      throw new UnauthorizedException(AUTH_USER.PASSWORD_WRONG);
    }

    return blogUserEnnity.toObject();
  }

  public async getUser(id: string) {
    return this.blogUserRepository.findById(id);
  }
}
