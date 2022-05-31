import { RouterModule, Routes } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ImageModule } from 'primeng/image';
import { MovieActorsDetailsComponent } from './movie-actors-details.component';
import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { AccordionModule } from 'primeng/accordion';
import { SEPSharedModule } from '../../shared/components/sep-shared.module';

const routes: Routes = [
    {
        path: '',
        component: MovieActorsDetailsComponent,
    },
];
@NgModule({
    declarations: [MovieActorsDetailsComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        TableModule,
        ButtonModule,
        CardModule,
        ImageModule,
        AccordionModule,
        SEPSharedModule,
    ],
    providers: [],
})
export class MovieActorsDetailsModule {}
