import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

@Module({
    imports: [PrismaModule],
    providers: [CommentsService],
    controllers: [CommentsController],
    exports: [CommentsService],
})
export class CommentsModule {}
