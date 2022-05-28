import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'lang' })
export class LanguagePipe implements PipeTransform {
    languageMap = new Map<string, string>([
        [`en`, `English`],
        [`pl`, `Polish`],
        [`es`, `Spanish`],
        [`fr`, `French`],
        [`ja`, `Japanese`],
        [`ko`, `Korean`],
        [`hi`, `Hindi`],
        [`it`, `Italian`],
        [`no`, `Norwegian`],
        [`ru`, `Russian `],
        [`pt`, `Portuguese `],
        [`th`, `Thai `],
        [`de`, `German`],
        [`zh`, `Chinese`],
    ]);

    transform(value: string): string {
        const lang = this.languageMap.get(value);
        if (!lang) {
            return value;
        }
        return this.languageMap.get(value);
    }
}
