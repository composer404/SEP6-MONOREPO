import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserBoardComponent } from './user-board.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { FollowsModalComponent } from './components/follows-modal/follows-modal.component';

const routes: Routes = [
    {
        path: '',
        component: UserBoardComponent,
    },
];
@NgModule({
    declarations: [UserBoardComponent, FollowsModalComponent],
    imports: [CommonModule, RouterModule.forChild(routes), DynamicDialogModule],
    providers: [],
})
export class UserBoardModule {}
