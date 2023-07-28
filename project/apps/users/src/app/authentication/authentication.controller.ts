import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from './dto/create-user.dto';
import { fillObject } from '@project/util/util-core';
import { UserRdo } from './rdo/user.rdo';
import { LoginUserDto } from './dto/login-user.dto';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AUTH_USER } from './authentication.constant';

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
  ) { }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: AUTH_USER.CREATED,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: AUTH_USER.EXISTS
  })
  @Post('register')
  public async create(
    @Body() dto: CreateUserDto
  ) {
    const newUser = await this.authService.register(dto);
    return fillObject(UserRdo, newUser);
  }

  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: AUTH_USER.LOGGED,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AUTH_USER.PASSWODR_OR_LOGIN_WRONG,
  })
  @Post('login')
  public async login(
    @Body() dto: LoginUserDto
  ) {
    const verifiedUser = await this.authService.verifyUser(dto);
    return fillObject(LoggedUserRdo, verifiedUser);
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: AUTH_USER.GET,
  })
  @Get(':id')
  public async show(
    @Param('id') id: string
  ) {
    const existUser = await this.authService.getUser(id);
    return fillObject(UserRdo, existUser);
  }
}
