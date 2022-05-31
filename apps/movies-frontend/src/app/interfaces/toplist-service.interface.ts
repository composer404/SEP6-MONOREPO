import { SEPToplist } from './interfaces';

export interface IToplistService {
    getToplistForUser(userId: string): Promise<SEPToplist[]>;
}
