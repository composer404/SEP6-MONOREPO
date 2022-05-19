import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {CardModule} from "primeng/card";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RankingComponent} from "./ranking.component";
import {InputTextareaModule} from 'primeng/inputtextarea';
import {CardComponent} from "../../components/card/card.component";

const routes: Routes = [
  {
    path: '',
    component: RankingComponent
  }
]
@NgModule({
  declarations: [
    RankingComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ButtonModule,
    RippleModule,
    CardModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextareaModule,
  ],
  providers: [],
})
export class RankingModule { }
