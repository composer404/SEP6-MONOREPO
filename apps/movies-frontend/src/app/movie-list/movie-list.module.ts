import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './movie-list.component';

const routes: Routes = [
  {
    path: '',
    component: MovieListComponent,
  },
];
@NgModule({
  declarations: [MovieListComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [],
})
export class MovieListModule {}
