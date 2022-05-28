import { Module, OnModuleInit } from '@nestjs/common';
import { UsersModule } from './modules/users/';
import { AuthModule } from './modules/auth/';
import { MoviesModule } from './modules/movies/';
import { TopListsModule } from './modules/top-lists';
import { RatingsModule } from './modules/ratings';
import { CommentsModule } from './modules/comments';
import { exec } from 'child_process';

@Module({
    imports: [UsersModule, AuthModule, MoviesModule, TopListsModule, RatingsModule, CommentsModule],
})
export class AppModule implements OnModuleInit {
    onModuleInit() {
        exec(`npx prisma migrate deploy`);
    }
}
