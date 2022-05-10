import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.AUTH_JWT_SECRET,
            signOptions: { expiresIn: process.env.AUTH_JWT_EXPIRES_IN },
        }),
    ],
    providers: [AuthService, AuthController, JwtStrategy, LocalStrategy],
    exports: [AuthService, AuthController],
})
export class AuthModule {}
