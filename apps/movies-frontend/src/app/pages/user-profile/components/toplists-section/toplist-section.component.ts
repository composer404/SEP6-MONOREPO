import { Component, Input } from '@angular/core';
import { SEPToplist } from '../../../../interfaces/interfaces';

@Component({
    selector: 'app-toplists-section',
    templateUrl: './toplist-section.component.html',
    styleUrls: ['./toplist-section.component.scss'],
})
export class TopListSectionComponent {
    @Input()
    toplists: SEPToplist[];

    @Input()
    isProfileOwner: boolean;
}
