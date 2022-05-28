export interface ApiResponseError {
    errorCode: ErrorCodes;
    errorMessage: string;
}

export enum ErrorCodes {
    SUCCESS = `E_0`,
    INVALID_PASSWORD = `E_1000`,
    INVALID_LOGIN = `E_1001`,
}
