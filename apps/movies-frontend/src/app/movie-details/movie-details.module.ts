import { RouterModule, Routes } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { FormsModule } from '@angular/forms';
import { ImageModule } from 'primeng/image';
import { MovieDetailsComponent } from './movie-details.component';
import { NgModule } from '@angular/core';
import { RatingModule } from 'primeng/rating';
import { TableModule } from 'primeng/table';
import { AddToToplistModalComponent } from './components/add-to-toplist-modal/add-to-toplist-modal.component';
import { AvatarModule } from 'primeng/avatar';
import { CommentItemMovieComponent } from './components/comment-item-movie/comment-item-movie.component';
import { SEPSharedModule } from '../shared/components/sep-shared.module';
import { AccordionModule } from 'primeng/accordion';
import { ChipModule } from 'primeng/chip';
import { InputTextModule } from 'primeng/inputtext';

const routes: Routes = [
    {
        path: '',
        component: MovieDetailsComponent,
    },
];
@NgModule({
    declarations: [MovieDetailsComponent, AddToToplistModalComponent, CommentItemMovieComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        TableModule,
        ButtonModule,
        CardModule,
        ImageModule,
        RatingModule,
        DynamicDialogModule,
        FormsModule,
        AvatarModule,
        SEPSharedModule,
        AccordionModule,
        InputTextModule,
        ChipModule,
    ],
    providers: [],
})
export class MovieDetailsModule {}
