import { RouterModule, Routes } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImageModule } from 'primeng/image';
import { MovieActorsComponent } from '../movie-actors/movie-actors.comonent';
import { MovieActorsDetailsComponent } from './movie-actors-details.component';
import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';

const routes: Routes = [
    {
        path: '',
        component: MovieActorsDetailsComponent,
    },
];
@NgModule({
    declarations: [MovieActorsDetailsComponent],
    imports: [CommonModule, RouterModule.forChild(routes), TableModule, ButtonModule, CardModule, ImageModule],
    providers: [],
})
export class MovieActorsDetailsModule {}
