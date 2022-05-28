import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/';
import { AuthModule } from './modules/auth/';
import { MoviesModule } from './modules/movies/';
import { TopListsModule } from './modules/top-lists';
import { RatingsModule } from './modules/ratings';
import { CommentsModule } from './modules/comments';

@Module({
    imports: [UsersModule, AuthModule, MoviesModule, TopListsModule, RatingsModule, CommentsModule],
})
export class AppModule {}
