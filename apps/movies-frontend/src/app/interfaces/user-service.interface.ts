import { SEPUser } from './interfaces';

export interface IUserService {
    getClientById(id: string): Promise<SEPUser>;
    getNumberOfFollowers(userId: string): Promise<number>;
    getNumberOfFollowing(userId: string): Promise<number>;
    checkIsFollowing(userId: string): Promise<boolean>;
    followUser(userId: string): Promise<boolean>;
    unfollowUser(userId: string): Promise<boolean>;
}
