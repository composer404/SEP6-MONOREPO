import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SEPToplist } from '../../interfaces/interfaces';
import { LOCAL_API_SERVICES } from '../../interfaces/local-api-endpoints';
import { IToplistService } from '../../interfaces/toplist-service.interface';

@Injectable({
    providedIn: 'root',
})
export class ToplistService implements IToplistService {
    constructor(private readonly httpClient: HttpClient) {}

    getToplistForUser(userId: string): Promise<SEPToplist[]> {
        const url = `${environment.localApiUrl}${LOCAL_API_SERVICES.toplistUser}/${userId}`;
        return firstValueFrom(this.httpClient.get<SEPToplist[] | null>(url));
    }
}
