import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma';
import { RatingsController } from './ratings.controller';
import { RatingsService } from './ratings.service';

@Module({
    imports: [PrismaModule],
    providers: [RatingsService],
    controllers: [RatingsController],
    exports: [RatingsService],
})
export class RatingsModule {}
