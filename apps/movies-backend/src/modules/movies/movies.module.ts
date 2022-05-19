import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
    imports: [PrismaModule],
    providers: [MoviesService],
    controllers: [MoviesController],
    exports: [MoviesService],
})
export class MoviesModule {}
