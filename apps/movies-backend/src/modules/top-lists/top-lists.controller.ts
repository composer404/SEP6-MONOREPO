import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { TopList } from '@prisma/client';
import { SEPMovieInput, SEPRequest, SEPTopListInput } from '../../models';
import { JwtAuthGuard } from '../auth/guards';
import { TopListsService } from './top-lists.service';

@Controller('toplists')
export class TopListsController {
    constructor(private readonly topListsService: TopListsService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async createTopList(@Request() req: SEPRequest, @Body() input: SEPTopListInput): Promise<string> {
        return this.topListsService.createNewTopList(req.user.id, input);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async removeTopList(@Request() req: SEPRequest, @Param() params): Promise<boolean> {
        return this.topListsService.deleteTopList(params.id, req.user.id);
    }

    @Get(':id')
    async getTopList(@Param() params): Promise<TopList> {
        return this.topListsService.getTopListById(params.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getTopListsByLoggedUser(@Request() req: SEPRequest): Promise<TopList[]> {
        return this.topListsService.getTopListsByUserId(req.user.id);
    }

    @Get('user/:id')
    async getTopListsByUser(@Param() params): Promise<TopList[]> {
        return this.topListsService.getTopListsByUserId(params.id);
    }

    @Get('full/user/:id')
    async getTopListsFullByUser(@Param() params): Promise<TopList[]> {
        return this.topListsService.getTopListsFullByUserId(params.id);
    }

    @Put(':id/movie/add')
    async addMovieToTopList(@Param() params, @Body() input: SEPMovieInput): Promise<boolean> {
        return this.topListsService.addMovieToTopList(params.id, input);
    }

    @Put(':id/movie/:apiId/remove')
    async removeMovieToTopList(@Param() params): Promise<boolean> {
        return this.topListsService.removeMovieFromTopList(params.id, params.apiId);
    }
}
