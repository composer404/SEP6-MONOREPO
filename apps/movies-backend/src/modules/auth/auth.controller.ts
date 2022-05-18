import { Controller, Post, UseGuards, Get, Body, Request } from '@nestjs/common';
import { SEPRequest, SignUpInput, UserOutput } from '../../models';
import { AuthService } from './auth.service';
import { JwtAuthGuard, LocalAuthGuard } from './guards';

@Controller(`auth`)
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user as UserOutput);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req: SEPRequest) {
        return req.user;
    }

    @Post('registry')
    async registry(@Body() userInput: SignUpInput): Promise<boolean> {
        return this.authService.registry(userInput);
    }
}
