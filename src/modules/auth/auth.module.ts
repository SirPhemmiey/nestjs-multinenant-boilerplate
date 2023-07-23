import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'modules/users/users.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [JwtModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get('auth.secret'),
        signOptions: { expiresIn: configService.get('auth.expires') },
      }),
      inject: [ConfigService]
    }),],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
