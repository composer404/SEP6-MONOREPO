import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home.component";
import { ButtonModule } from 'primeng/button';
import { RippleModule } from "primeng/ripple";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
]
@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ButtonModule,
    RippleModule
  ],
  providers: [],
})
export class HomeModule { }
