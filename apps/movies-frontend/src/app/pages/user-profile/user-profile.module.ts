import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { TabMenuModule } from 'primeng/tabmenu';
import { SEPSharedModule } from '../../shared/components/sep-shared.module';
import { CommentsSectionComponent } from './components/comments-section/comments-section.component';
import { FollowsModalComponent } from './components/follows-modal/follows-modal.component';
import { RatingsSectionComponent } from './components/ratings-section/ratings-section.component';
import { StatisticsSectionComponent } from './components/statistics-section/statistics-section.component';
import { TopListSectionComponent } from './components/toplists-section/toplist-section.component';
import { ChartModule } from 'primeng/chart';

const routes: Routes = [
    {
        path: '',
        component: UserProfileComponent,
    },
];
@NgModule({
    declarations: [
        UserProfileComponent,
        FollowsModalComponent,
        TopListSectionComponent,
        StatisticsSectionComponent,
        RatingsSectionComponent,
        CommentsSectionComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        DynamicDialogModule,
        TabMenuModule,
        SEPSharedModule,
        ChartModule,
    ],
    providers: [],
})
export class UserProfileModule {}
