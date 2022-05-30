import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guard/auth.guard';
import { LoginModule } from './pages/login/login.module';
import { MovieActorsDetailsModule } from './pages/movie-actors-details/movie-actors-details.module';
import { MovieActorsModule } from './pages/movie-actors/movie-actors.module';
import { MovieDetailsModule } from './movie-details/movie-details.module';
import { MovieListModule } from './pages/movie-list/movie-list.module';
import { NgModule } from '@angular/core';
import { SignupModule } from './pages/signup/signup.module';
import { UserProfileModule } from './pages/user-profile';
import { LoginGuard } from './guard/login.guard';

const routes: Routes = [
    {
        path: 'login',
        canActivate: [LoginGuard],
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
        canActivate: [AuthGuard],
        loadChildren: () => {
            return MovieListModule;
        },
    },
    {
        path: `movie-list/movie-details/:id`,
        canActivate: [AuthGuard],
        loadChildren: () => {
            return MovieDetailsModule;
        },
    },
    {
        path: 'movie-actors',
        canActivate: [AuthGuard],
        loadChildren: () => {
            return MovieActorsModule;
        },
    },
    {
        path: `movie-actors/movie-actors-details/:id`,
        canActivate: [AuthGuard],
        loadChildren: () => {
            return MovieActorsDetailsModule;
        },
    },
    {
        path: `movie-list/movie-details/:id'/movie-actors-details/:id`,
        canActivate: [AuthGuard],
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
