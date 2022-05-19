import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {SignupComponent} from "./signup.component";
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastModule} from 'primeng/toast';
import {MessageService} from "primeng/api";

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
    InputTextModule,
    AvatarModule,
    AvatarGroupModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule
  ],
  providers: [MessageService],
})
export class SignupModule { }
