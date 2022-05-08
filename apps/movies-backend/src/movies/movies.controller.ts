import { Controller, Get, Post } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  findAll(): string[] {
    return [`test1`, `test2`, `test3`];
  }
}
