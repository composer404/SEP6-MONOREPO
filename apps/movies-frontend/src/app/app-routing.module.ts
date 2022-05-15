import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { MovieListModule } from './movie-list/movie-list.module';
import { SignupModule } from './signup/signup.module';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => {
      return HomeModule;
    },
  },
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
    path: 'movie-list',
    loadChildren: () => {
      return MovieListModule;
    },
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
