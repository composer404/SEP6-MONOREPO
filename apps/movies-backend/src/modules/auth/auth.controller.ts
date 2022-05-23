import { Controller, Post, UseGuards, Get, Body, Request } from '@nestjs/common';
import { CreatedObjectResponse, SEPRequest, SignUpInput, UserOutput } from '../../models';
import { AuthService } from './auth.service';
import { JwtAuthGuard, LocalAuthGuard } from './guards';

@Controller(`auth`)
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req: SEPRequest) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req: SEPRequest): UserOutput {
        return req.user;
    }

    @Post('registry')
    async registry(@Body() userInput: SignUpInput): Promise<CreatedObjectResponse | null> {
        return this.authService.registry(userInput);
    }
}
