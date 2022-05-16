import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    imports: [PrismaModule],
    providers: [UsersService, UsersController],
    exports: [UsersService],
})
export class UsersModule {}
