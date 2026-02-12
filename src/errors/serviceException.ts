export class ServiceException extends Error {

    public readonly errorCode : number;
    public readonly httpStatus : number;

    constructor(errorCode: number, errorMessage: string, httpStatus: number = 400) {
        super(errorMessage);
        this.errorCode = errorCode;
        this.httpStatus = httpStatus;
    }
}