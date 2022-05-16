import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {SignupComponent} from "./signup.component";
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";

const routes: Routes = [
  {
    path: '',
    component: SignupComponent
  }
]
@NgModule({
  declarations: [
    SignupComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ButtonModule,
    RippleModule,
    CardModule,
    DividerModule,
    InputTextModule
  ],
  providers: [],
})
export class SignupModule { }
