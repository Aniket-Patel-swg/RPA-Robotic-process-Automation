export class HandlerException extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number = 500) {
        super(message);
        this.name = 'HandlerException';
        this.statusCode = statusCode;
    }
}

export class ServiceException extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number = 500) {
        super(message);
        this.name = 'ServiceException';
        this.statusCode = statusCode;
    }
}

export class ConverterException extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number = 400) {
        super(message);
        this.name = 'ConverterException';
        this.statusCode = statusCode;
    }
} 