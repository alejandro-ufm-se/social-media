export class ServiceException extends Error {

    public readonly errorCode : number;

    constructor(errorCode: number, erroMessage: string) {
        super(erroMessage);
        this.errorCode = errorCode;
    }
}