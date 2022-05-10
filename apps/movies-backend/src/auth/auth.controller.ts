import {
    Controller,
    Request,
    Post,
    UseGuards,
    Get,
    Body,
} from '@nestjs/common';
import { SignUpInput } from 'src/interfaces/interfaces';
import { AuthService } from './auth.service';
import { JwtAuthGuard, LocalAuthGuard } from './guards';

@Controller(`auth`)
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @Post('registry')
    async registry(@Body() userInput: SignUpInput): Promise<boolean> {
        return this.authService.registry(userInput);
    }
}
