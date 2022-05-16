import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeModule } from './pages/home/home.module';
import { LoginModule } from './pages/login/login.module';
import { SignupModule } from './pages/signup/signup.module';
import { AuthGuard } from './guard/auth.guard';
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
        path: '**',
        redirectTo: 'login',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
