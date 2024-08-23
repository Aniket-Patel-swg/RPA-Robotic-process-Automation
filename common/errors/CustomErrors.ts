export class HandlerException extends Error {
    constructor(message: string, public details?: any) {
        super(message);
        this.name = 'HandlerException';
        Object.setPrototypeOf(this, HandlerException.prototype);
    }
}

export class ConverterException extends Error {
    constructor(message: string, public details?: any) {
        super(message);
        this.name = 'ConverterException';
        Object.setPrototypeOf(this, ConverterException.prototype);
    }
}

export class ServiceException extends Error {
    constructor(message: string, public details?: any) {
        super(message);
        this.name = 'ServiceException';
        Object.setPrototypeOf(this, ServiceException.prototype);
    }
}

export class ClientException extends Error {
    constructor(message: string, public details?: any) {
        super(message);
        this.name = 'ClientException';
        Object.setPrototypeOf(this, ClientException.prototype);
    }
}