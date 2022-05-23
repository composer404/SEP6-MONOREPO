import { Component, Input } from '@angular/core';
import { SEPRating } from '../../../interfaces/interfaces';

@Component({
    selector: 'app-rating-item',
    templateUrl: './rating-item.component.html',
    styleUrls: ['./rating-item.component.scss'],
})
export class SEPRatingItemComponent {
    @Input()
    rating: SEPRating;
}
