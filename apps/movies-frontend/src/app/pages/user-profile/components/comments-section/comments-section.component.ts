import { Component, Input, OnInit } from '@angular/core';
import { SEPComment } from '../../../../interfaces/interfaces';

@Component({
    selector: 'app-comments-section',
    templateUrl: './comments-section.component.html',
    styleUrls: ['./comments-section.component.scss'],
})
export class CommentsSectionComponent {
    @Input()
    comments: SEPComment[];

    @Input()
    isProfileOwner: boolean;
}
