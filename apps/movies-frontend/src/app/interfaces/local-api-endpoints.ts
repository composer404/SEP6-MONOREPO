export enum LOCAL_API_SERVICES {
    /* ---------------------------------- AUTH ---------------------------------- */
    authLogin = `/auth/login`,
    authProfile = `/auth/profile`,
    authRegistry = `/auth/registry`,

    /* ---------------------------------- USERS --------------------------------- */
    users = `/users`,
    followersNumber = `/users/number/followers`,
    followingNumber = `/users/number/following`,
    checkFollowing = `/users/check/following`,
    follow = `/users/follows`,
    followers = `/users/followers`,
    following = `/users/following`,

    /* -------------------------------- TOPLISTS -------------------------------- */
    toplistUser = `/toplists/user`,
    topList = `/toplists`,

    /* -------------------------------- COMMENTS -------------------------------- */
    comments = `/comments`,

    /* --------------------------------- RATINGS -------------------------------- */

    ratings = `/ratings`,
}
