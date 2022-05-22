import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SEPToplistCardComponent } from './toplist-card/toplist-card.component';
import { CardModule } from 'primeng/card';
import { SEPCommentItemComponent } from './comment-item/comment-item.component';

@NgModule({
    declarations: [SEPToplistCardComponent, SEPCommentItemComponent],
    imports: [CommonModule, CardModule],
    exports: [SEPToplistCardComponent, SEPCommentItemComponent],
})
export class SEPSharedModule {}
