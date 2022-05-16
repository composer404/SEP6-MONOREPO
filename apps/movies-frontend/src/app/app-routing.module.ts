import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeModule} from "./pages/home/home.module";
import {LoginModule} from "./pages/login/login.module";
import {SignupModule} from "./pages/signup/signup.module";
import {AuthGuard} from "./core/guard/auth.guard";

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => {
      return HomeModule;
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => {
      return LoginModule;
    }
  },
  {
    path: 'signup',
    loadChildren: () => {
      return SignupModule;
    }
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
