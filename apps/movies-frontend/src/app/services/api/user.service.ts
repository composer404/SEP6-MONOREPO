import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SEPUser } from '../../interfaces/interfaces';
import { LOCAL_API_SERVICES } from '../../interfaces/local-api-endpoints';
import { IUserService } from '../../interfaces/user-service.interface';

@Injectable({
    providedIn: 'root',
})
export class UserService implements IUserService {
    constructor(private readonly httpClient: HttpClient) {}

    async getClientById(id: string): Promise<SEPUser> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.users}/${id}`;
        return firstValueFrom(this.httpClient.get<SEPUser>(url));
    }

    getNumberOfFollowers(userId: string): Promise<number> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.followersNumber}/${userId}`;
        return firstValueFrom(this.httpClient.get<number | null>(url));
    }

    getNumberOfFollowing(userId: string): Promise<number> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.followingNumber}/${userId}`;
        return firstValueFrom(this.httpClient.get<number | null>(url));
    }

    async checkIsFollowing(userId: string): Promise<boolean> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.checkFollowing}/${userId}`;
        return firstValueFrom(this.httpClient.get<boolean>(url));
    }

    async followUser(userId: string): Promise<boolean> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.follow}`;
        return firstValueFrom(
            this.httpClient.post<boolean>(url, {
                followingId: userId,
            }),
        );
    }

    async unfollowUser(userId: string): Promise<boolean> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.follow}`;
        return firstValueFrom(
            this.httpClient.delete<boolean>(url, {
                body: {
                    followingId: userId,
                },
            }),
        );
    }
}
