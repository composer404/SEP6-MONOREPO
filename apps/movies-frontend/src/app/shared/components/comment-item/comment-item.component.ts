import { Component, Input } from '@angular/core';
import { SEPComment } from '../../../interfaces/interfaces';

@Component({
    selector: 'app-comment-item',
    templateUrl: './comment-item.component.html',
    styleUrls: ['./comment-item.component.scss'],
})
export class SEPCommentItemComponent {
    @Input()
    comment: SEPComment;
}
