import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma';
import { MoviesModule } from '../movies';
import { TopListsController } from './top-lists.controller';
import { TopListsService } from './top-lists.service';

@Module({
    imports: [PrismaModule, MoviesModule],
    providers: [TopListsService],
    controllers: [TopListsController],
    exports: [TopListsService],
})
export class TopListsModule {}
