import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [MessageService],
})
export class AppComponent implements OnInit, OnDestroy {
    menuItems: MenuItem[];
    login: string;
    id: string;
    subscriptions: Subscription[];

    constructor(private readonly authService: AuthService, private readonly router: Router) {}

    ngOnInit(): void {
        this.prepareMenuItems();
        this.subscribeForLoginEvents();
        void this.getUserProfle();
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((sub) => {
            sub.unsubscribe();
        });
    }

    logout() {
        this.authService.logout();
    }

    private async getUserProfle(): Promise<void> {
        const profile = await this.authService.getProfile();
        this.login = profile.login;
        this.id = profile.id;
    }

    private subscribeForLoginEvents(): void {
        this.authService.loginSubject.subscribe((value) => {
            if (value) {
                this.getUserProfle();
            }

            if (!value) {
                this.login = undefined;
            }
        });
    }

    private prepareMenuItems() {
        this.menuItems = [
            {
                label: 'Profile',
                icon: 'pi pi-fw pi-user',
                command: () => {
                    console.log(`route`, `profile/${this.id}`);
                    this.router.navigate([`profile/${this.id}`]);
                },
            },
            {
                label: 'New toplist',
                icon: 'pi pi-fw pi-plus',
                command: () => {
                    this.router.navigate([`ranking`]);
                },
            },
            {
                label: 'Search movies',
                icon: 'pi pi-fw pi-search',
                command: () => {
                    this.router.navigate([`movie-list`]);
                },
            },
        ];
    }
}
