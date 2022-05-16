import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserBoardComponent } from './user-board.component';

const routes: Routes = [
    {
        path: '',
        component: UserBoardComponent,
    },
];
@NgModule({
    declarations: [UserBoardComponent],
    imports: [CommonModule, RouterModule.forChild(routes)],
    providers: [],
})
export class UserBoardModule {}
