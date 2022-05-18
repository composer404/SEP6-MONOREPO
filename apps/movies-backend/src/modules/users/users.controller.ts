import { Controller, UseGuards, Request, Delete, Patch, Body, Get } from '@nestjs/common';
import { SEPRequest, SEPUser, UserUpdateInput } from '../../models';
import { JwtAuthGuard } from '../auth/guards';
import { UsersService } from './users.service';

@Controller(`users`)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Delete('logged')
    async deleteUser(@Request() req: SEPRequest): Promise<boolean> {
        return this.usersService.deleteUser(req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('logged')
    async updateUser(@Request() req: SEPRequest, @Body() user: UserUpdateInput): Promise<boolean> {
        return this.usersService.updateUser(req.user.id, user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('logged')
    async getUser(@Request() req: SEPRequest): Promise<SEPUser> {
        return this.usersService.findUserById(req.user.id);
    }
}
