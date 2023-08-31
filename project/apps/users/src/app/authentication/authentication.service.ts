import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { TokenPayload, User, UserRole } from '@project/shared/app-types';
import { BlogUserEntity } from '../blog-user/blog-user.entity';
import { AUTH_USER } from './authentication.constant';
import { LoginUserDto } from './dto/login-user.dto';
import { BlogUserRepository } from '../blog-user/blog-user.repository';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
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

    const blogUserEntity = new BlogUserEntity(existUser);
    if (!await blogUserEntity.comparePassword(password)) {
      throw new UnauthorizedException(AUTH_USER.PASSWORD_WRONG);
    }

    return blogUserEntity.toObject();
  }

  public async getUser(id: string) {
    return this.blogUserRepository.findById(id);
  }

  public async createUserToken(user: User) {
    const payload: TokenPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      firstname: user.firstname,
      lastname: user.lastname,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    }
  }
}
