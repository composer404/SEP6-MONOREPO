import { Component, Input } from '@angular/core';
import { SEPRating } from '../../../../interfaces/interfaces';

@Component({
    selector: 'app-ratings-section',
    templateUrl: './ratings-section.component.html',
    styleUrls: ['./ratings-section.component.scss'],
})
export class RatingsSectionComponent {
    @Input()
    ratings: SEPRating[];

    @Input()
    isProfileOwner: boolean;
}
