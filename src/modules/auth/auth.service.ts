import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'modules/users/users.service';
import { SignInDto } from './dto/auth-login.dto';
import { CreateUserDto } from 'modules/users/dto/create-user-dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) { }

  async signUp(createUserDto: CreateUserDto) {
    const saltRounds = this.configService.get('auth.saltRounds');
    const passwordHash = await bcrypt.hash(createUserDto.password, saltRounds);
    createUserDto.password = passwordHash;
    const createdUser = await this.usersService.create(createUserDto);
    return { id: createdUser.id };
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.usersService.findByEmail(signInDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credential');
    }
    const saltRounds = this.configService.get('auth.saltRounds');
    const hash = await bcrypt.hash(signInDto.password, saltRounds);
    const isMatch = await bcrypt.compare(signInDto.password, hash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credential');
    }
    const payload = { email: user.email, id: user.id };
    const token = await this.jwtService.signAsync(payload);
    return { token };
  }
}
