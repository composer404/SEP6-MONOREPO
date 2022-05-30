import { RouterModule, Routes } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieActorsComponent } from './movie-actors.comonent';
import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';

const routes: Routes = [
    {
        path: '',
        component: MovieActorsComponent,
    },
];
@NgModule({
    declarations: [MovieActorsComponent],
    imports: [CommonModule, RouterModule.forChild(routes), TableModule, ButtonModule, FormsModule],
    providers: [],
})
export class MovieActorsModule {}
