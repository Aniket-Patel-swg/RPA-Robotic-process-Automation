"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientException = exports.ServiceException = exports.ConverterException = exports.HandlerException = void 0;
class HandlerException extends Error {
    constructor(message, statusCode = 500, details) {
        super(message);
        this.details = details;
        this.statusCode = statusCode;
        this.name = 'HandlerException';
        Object.setPrototypeOf(this, HandlerException.prototype);
    }
}
exports.HandlerException = HandlerException;
class ConverterException extends Error {
    constructor(message, statusCode = 400, details) {
        super(message);
        this.details = details;
        this.statusCode = statusCode;
        this.name = 'ConverterException';
        Object.setPrototypeOf(this, ConverterException.prototype);
    }
}
exports.ConverterException = ConverterException;
class ServiceException extends Error {
    constructor(message, statusCode = 500, details) {
        super(message);
        this.details = details;
        this.statusCode = statusCode;
        this.name = 'ServiceException';
        Object.setPrototypeOf(this, ServiceException.prototype);
    }
}
exports.ServiceException = ServiceException;
class ClientException extends Error {
    constructor(message, statusCode = 502, details) {
        super(message);
        this.details = details;
        this.statusCode = statusCode;
        this.name = 'ClientException';
        Object.setPrototypeOf(this, ClientException.prototype);
    }
}
exports.ClientException = ClientException;
