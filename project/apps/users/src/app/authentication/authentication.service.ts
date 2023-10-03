import { ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserRole } from '@project/shared/app-types';
import { BlogUserEntity } from '../blog-user/blog-user.entity';
import { AUTH_USER } from './authentication.constant';
import { LoginUserDto } from './dto/login-user.dto';
import { BlogUserRepository } from '../blog-user/blog-user.repository';
import { ConfigService, ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { jwtConfig } from '@project/config/config-users';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { createJWTPayload } from '@project/util/util-core';
import * as crypto from 'node:crypto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly refreshTokenService: RefreshTokenService,

    @Inject(jwtConfig.KEY)
    private readonly jwtOptions: ConfigType<typeof jwtConfig>,
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
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = { ...accessTokenPayload, tokenId: crypto.randomUUID() };

    await this.refreshTokenService.createRefreshSession(refreshTokenPayload);

    return {
      accessToken: await this.jwtService.signAsync(accessTokenPayload),
      refreshToken: await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.refreshTokenExpiresIn,
      }),
    }
  }
}
