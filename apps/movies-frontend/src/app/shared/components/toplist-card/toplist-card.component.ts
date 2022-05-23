import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SEPToplist } from '../../../interfaces/interfaces';

@Component({
    selector: 'app-toplist-card',
    templateUrl: './toplist-card.component.html',
    styleUrls: ['./toplist-card.component.scss'],
})
export class SEPToplistCardComponent {
    @Input()
    toplist: SEPToplist;

    @Output()
    onRemove = new EventEmitter<string>();

    onRemoveClick() {
        this.onRemove.emit(this.toplist.id);
    }
}
