import { Controller, UseGuards, Request, Delete, Body, Get, Put, Post, Param } from '@nestjs/common';
import { Follows, User } from '@prisma/client';
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
    @Get(':id')
    async getUserById(@Param() params: any): Promise<SEPUser | null> {
        return this.usersService.findUserById(params.id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('follows')
    async followUser(@Request() req: SEPRequest, @Body() input: SEPFollowInput): Promise<boolean> {
        return this.usersService.followUser(req.user.id, input.followingId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('follows')
    async unfollowUser(@Request() req: SEPRequest, @Body() input: SEPFollowInput): Promise<boolean> {
        return this.usersService.unFollowUser(req.user.id, input.followingId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('followers/:id')
    async getFollowerForUser(@Param() params: any): Promise<User[] | null> {
        return this.usersService.getFollowersForUser(params.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('check/following/:id')
    async checkIfFollowing(@Request() req: SEPRequest, @Param() params: any): Promise<boolean> {
        return this.usersService.checkIfFollowing(req.user.id, params.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('number/followers/:id')
    async getFollowerNumberForUser(@Param() params: any): Promise<number | null> {
        return this.usersService.getFollowersNumberForUser(params.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('following/:id')
    async getFollowingForUser(@Param() params: any): Promise<User[] | null> {
        return this.usersService.getFollowingForUser(params.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('number/following/:id')
    async getFollowingNumberForUser(@Param() params: any): Promise<number | null> {
        return this.usersService.getFollowingNumberForUser(params.id);
    }
}
