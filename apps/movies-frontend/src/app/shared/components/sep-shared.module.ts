import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SEPToplistCardComponent } from './toplist-card/toplist-card.component';
import { CardModule } from 'primeng/card';
import { SEPCommentItemComponent } from './comment-item/comment-item.component';
import { SEPRatingItemComponent } from './rating-item/rating-item.component';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';

@NgModule({
    declarations: [
        SEPToplistCardComponent,
        SEPCommentItemComponent,
        SEPRatingItemComponent,
        ConfirmationModalComponent,
    ],
    imports: [CommonModule, CardModule, RatingModule, FormsModule],
    exports: [SEPToplistCardComponent, SEPCommentItemComponent, SEPRatingItemComponent, ConfirmationModalComponent],
})
export class SEPSharedModule {}
