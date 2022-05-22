import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SEPToplistCardComponent } from './toplist-card/toplist-card.component';
import { CardModule } from 'primeng/card';
import { SEPCommentItemComponent } from './comment-item/comment-item.component';
import { SEPRatingItemComponent } from './rating-item/rating-item.component';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [SEPToplistCardComponent, SEPCommentItemComponent, SEPRatingItemComponent],
    imports: [CommonModule, CardModule, RatingModule, FormsModule],
    exports: [SEPToplistCardComponent, SEPCommentItemComponent, SEPRatingItemComponent],
})
export class SEPSharedModule {}
