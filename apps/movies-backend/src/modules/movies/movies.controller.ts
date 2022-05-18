import { Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from '../../prisma';

@Controller('movies')
export class MoviesController {
    constructor(private readonly prismaService: PrismaService) {}
    //     @Post()
    //     async createMovie
}
