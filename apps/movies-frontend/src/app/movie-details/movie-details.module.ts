import { RouterModule, Routes } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImageModule } from 'primeng/image';
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
    imports: [CommonModule, RouterModule.forChild(routes), TableModule, ButtonModule, CardModule, ImageModule],
    providers: [],
})
export class MovieDetailsModule {}
