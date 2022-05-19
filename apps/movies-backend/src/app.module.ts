import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { MoviesModule } from './modules/movies/movies.module';
import { TopListsModule } from './modules/top-lists/top-lists.module';

@Module({
    imports: [UsersModule, AuthModule, MoviesModule, TopListsModule],
})
export class AppModule {}
