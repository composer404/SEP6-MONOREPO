import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guard/auth.guard';
import { HomeModule } from './pages/home/home.module';
import { LoginModule } from './pages/login/login.module';
import { MovieDetailsModule } from './movie-details/movie-details.module';
import { MovieListModule } from './movie-list/movie-list.module';
import { NgModule } from '@angular/core';
import { SignupModule } from './pages/signup/signup.module';
import { UserBoardModule } from './pages/user-board/user-board.module';

const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => {
            return LoginModule;
        },
    },
    {
        path: 'signup',
        loadChildren: () => {
            return SignupModule;
        },
    },
    {
        path: `board/:id`,
        canActivate: [AuthGuard],
        loadChildren: () => {
            return UserBoardModule;
        },
    },
    {
        path: 'movie-list',
        loadChildren: () => {
            return MovieListModule;
        },
    },
    {
        path: `movie-list/movie-details/:id`,
        loadChildren: () => {
            return MovieDetailsModule;
        },
    },
    {
        path: '**',
        redirectTo: 'login',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
