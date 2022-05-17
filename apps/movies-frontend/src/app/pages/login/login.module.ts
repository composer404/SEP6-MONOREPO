import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login.component";
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import {FormsModule} from "@angular/forms";
import {ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  }
]
@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ButtonModule,
    RippleModule,
    CardModule,
    DividerModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
})
export class LoginModule { }
