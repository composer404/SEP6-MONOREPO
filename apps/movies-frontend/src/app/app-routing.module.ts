import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guard/auth.guard';
import { LoginModule } from './pages/login/login.module';
import { MovieActorsDetailsModule } from './movie-actors-details/movie-actors-details.module';
import { MovieActorsModule } from './movie-actors/movie-actors.module';
import { MovieDetailsModule } from './movie-details/movie-details.module';
import { MovieListModule } from './movie-list/movie-list.module';
import { NgModule } from '@angular/core';
import { SignupModule } from './pages/signup/signup.module';
import { UserProfileModule } from './pages/user-profile';

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
        path: `profile/:id`,
        canActivate: [AuthGuard],
        loadChildren: () => {
            return UserProfileModule;
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
        path: 'movie-actors',
        loadChildren: () => {
            return MovieActorsModule;
        },
    },
    {
        path: `movie-actors/movie-actors-details/:id`,
        loadChildren: () => {
            return MovieActorsDetailsModule;
        },
    },
    {
        path: `movie-list/movie-details/:id'/movie-actors-details/:id`,
        loadChildren: () => {
            return MovieActorsDetailsModule;
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
