export class HandlerException extends Error {
    public statusCode: number;

    constructor(message: string, statusCode: number = 500, public details?: any) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'HandlerException';
        Object.setPrototypeOf(this, HandlerException.prototype);
    }
}

export class ConverterException extends Error {
    public statusCode: number;

    constructor(message: string, statusCode: number = 400, public details?: any) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'ConverterException';
        Object.setPrototypeOf(this, ConverterException.prototype);
    }
}

export class ServiceException extends Error {
    public statusCode: number;

    constructor(message: string, statusCode: number = 500, public details?: any) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'ServiceException';
        Object.setPrototypeOf(this, ServiceException.prototype);
    }
}

export class ClientException extends Error {
    public statusCode: number;

    constructor(message: string, statusCode: number = 502, public details?: any) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'ClientException';
        Object.setPrototypeOf(this, ClientException.prototype);
    }
}
