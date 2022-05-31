import { RouterModule, Routes } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieListComponent } from './movie-list.component';
import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { SEPSharedModule } from '../../shared/components/sep-shared.module';

const routes: Routes = [
    {
        path: '',
        component: MovieListComponent,
    },
];
@NgModule({
    declarations: [MovieListComponent],
    imports: [CommonModule, RouterModule.forChild(routes), TableModule, ButtonModule, FormsModule, SEPSharedModule],
})
export class MovieListModule {}
