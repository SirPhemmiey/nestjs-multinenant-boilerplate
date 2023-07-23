import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
  UseFilters
} from '@nestjs/common';
import { CreateUserDto } from 'modules/users/dto/create-user-dto';
import { AllExceptionsFilter } from 'utils/filters/all-exceptions.filter';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/auth-login.dto';

@Controller('auth')
@UseFilters(AllExceptionsFilter)
export class AuthController {
  constructor(readonly authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post('/signin')
  signIn(@Body() signInDto: SignInDto): Promise<{ token: string }> {
    try {
      return this.authService.signIn(signInDto);
    } catch (error) {
      throw new UnauthorizedException('Incorrect sign details');
    }
  }

  // @UseGuards(AuthGuard)
  // @Get('profile')
  // getProfile(@Request() req) {
  //   return req.user;
  // }

  @HttpCode(HttpStatus.CREATED)
  @Post('/signup')
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      return this.authService.signUp(createUserDto);
    } catch (error) {
      throw new BadRequestException('Error occured while creating user');
    }
  }
}
