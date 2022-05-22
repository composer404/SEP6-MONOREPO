import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guard/auth.guard';
import { LoginModule } from './pages/login/login.module';
import { MovieListModule } from './movie-list/movie-list.module';
import { NgModule } from '@angular/core';
import { SignupModule } from './pages/signup/signup.module';
import { RankingModule } from './pages/ranking/ranking.module';
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
        path: 'ranking',
        loadChildren: () => {
            return RankingModule;
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
        path: '**',
        redirectTo: 'login',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
