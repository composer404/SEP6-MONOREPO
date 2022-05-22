import { Component, Input } from '@angular/core';
import { SEPComment, SEPToplist } from '../../../../interfaces/interfaces';

@Component({
    selector: 'app-statistics-section',
    templateUrl: './statistics-section.component.html',
    styleUrls: ['./statistics-section.component.scss'],
})
export class StatisticsSectionComponent {
    @Input()
    toplists: SEPToplist[];

    @Input()
    comments: SEPComment[];

    basicData: any;
    basicOptions: any;

    async ngOnInit(): Promise<void> {
        this.getArrayWithValues(this.toplists as any);
        this.basicData = {
            labels: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
            ],
            datasets: [
                {
                    label: 'Toplists',
                    data: await this.getArrayWithValues(this.toplists),
                    fill: false,
                    borderColor: '#7f1d1d',
                    tension: 0.4,
                },
                {
                    label: 'Comments',
                    data: await this.getArrayWithValues(this.comments),
                    fill: false,
                    borderColor: '#000',
                    tension: 0.4,
                },
            ],
        };

        this.basicOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057',
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057',
                    },
                    grid: {
                        color: '#ebedef',
                    },
                },
                y: {
                    ticks: {
                        color: '#495057',
                    },
                    grid: {
                        color: '#ebedef',
                    },
                },
            },
        };
    }

    async getArrayWithValues(elements: any): Promise<number[]> {
        const resultsInMonthArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const promises = elements.map((element) => {
            new Promise<void>((resolve) => {
                const elementDate = new Date(element.createdAt);
                const currentDate = new Date();

                if (elementDate.getFullYear() === currentDate.getFullYear()) {
                    const month = elementDate.getMonth();
                    resultsInMonthArray[month]++;
                }
                resolve();
            });
        });

        Promise.all(promises);
        console.log(resultsInMonthArray);
        return resultsInMonthArray;
    }
}
