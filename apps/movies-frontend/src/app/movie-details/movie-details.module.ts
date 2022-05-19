import { RouterModule, Routes } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieDetailsComponent } from './movie-details.component';
import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';

const routes: Routes = [
    {
        path: '',
        component: MovieDetailsComponent,
    },
];
@NgModule({
    declarations: [MovieDetailsComponent],
    imports: [CommonModule, RouterModule.forChild(routes), TableModule, ButtonModule, FormsModule],
    providers: [],
})
export class MovieDetailsModule {}
