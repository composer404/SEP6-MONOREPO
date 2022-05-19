import { Controller, UseGuards, Request, Delete, Body, Get, Put, Post } from '@nestjs/common';
import { Follows } from '@prisma/client';
import { SEPFollowInput, SEPRequest, SEPUser, UserUpdateInput } from '../../models';
import { JwtAuthGuard } from '../auth/guards';
import { UsersService } from './users.service';

@Controller(`users`)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Delete()
    async deleteUser(@Request() req: SEPRequest): Promise<boolean> {
        return this.usersService.deleteUser(req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    async updateUser(@Request() req: SEPRequest, @Body() user: UserUpdateInput): Promise<boolean> {
        return this.usersService.updateUser(req.user.id, user);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getUser(@Request() req: SEPRequest): Promise<SEPUser | null> {
        return this.usersService.findUserById(req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('follows')
    async followUser(@Request() req: SEPRequest, input: SEPFollowInput): Promise<boolean> {
        return this.usersService.followUser(req.user.id, input.followingId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('follows')
    async unfollowUser(@Request() req: SEPRequest, input: SEPFollowInput): Promise<boolean> {
        return this.usersService.unFollowUser(req.user.id, input.followingId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('followers')
    async getFollowerForUser(@Request() req: SEPRequest): Promise<Follows[] | null> {
        return this.usersService.getFollowersForUser(req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('followers')
    async getFollowingForUser(@Request() req: SEPRequest): Promise<Follows[] | null> {
        return this.usersService.getFollowingForUser(req.user.id);
    }
}
