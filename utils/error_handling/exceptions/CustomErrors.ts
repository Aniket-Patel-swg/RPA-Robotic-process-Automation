/**
 * Represents a custom error used in the handler layer of the application to encapsulate
 * handler-related exceptions. Provides a status code and optional details for
 * enhanced error handling and reporting.
 * 
 * @class HandlerException
 * @extends Error
 * @property {number} statusCode - HTTP status code associated with the error.
 * @property {any} [details] - Optional additional details about the error.
 *
 * @param {string} message - Error message providing a description of the error.
 * @param {number} statusCode - HTTP status code indicating the error type.
 * @param {any} [details] - Additional details to aid in debugging or logging.
 */
export class HandlerException extends Error {
    public statusCode: number;

    constructor(message: string, statusCode: number , public details?: any) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'HandlerException';
    }
}

/**
 * Represents errors encountered in data conversion or transformation processes,
 * encapsulating a status code and optional error details.
 * 
 * @class ConverterException
 * @extends Error
 * @property {number} statusCode - HTTP status code associated with the error.
 * @property {any} [details] - Optional additional details about the error.
 *
 * @param {string} message - Error message describing the issue.
 * @param {number} statusCode - HTTP status code related to the error.
 * @param {any} [details] - Extra details to assist with debugging or reporting.
 */
export class ConverterException extends Error {
    public statusCode: number;

    constructor(message: string, statusCode: number , public details?: any) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'ConverterException';
    }
}

/**
 * Represents exceptions originating from the service layer, providing a custom
 * status code and additional error details for precise error handling.
 * 
 * @class ServiceException
 * @extends Error
 * @property {number} statusCode - HTTP status code indicating the error type.
 * @property {any} [details] - Optional extra information regarding the error.
 *
 * @param {string} message - Description of the error.
 * @param {number} statusCode - Associated HTTP status code.
 * @param {any} [details] - Supplementary details for debugging or logging.
 */
export class ServiceException extends Error {
    public statusCode: number;

    constructor(message: string, statusCode: number, public details?: any) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'ServiceException';
    }
}

/**
 * Indicates client-related errors, such as invalid requests or failed client requests.
 * Contains a custom status code and optional error details.
 * 
 * @class ClientException
 * @extends Error
 * @property {number} statusCode - HTTP status code representing the error.
 * @property {any} [details] - Additional details to aid in debugging or logging.
 *
 * @param {string} message - Error message.
 * @param {number} statusCode - Associated HTTP status code.
 * @param {any} [details] - Extra details relevant to the error.
 */
export class ClientException extends Error {
    public statusCode: number;

    constructor(message: string, statusCode: number, public details?: any) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'ClientException';
    }
}

/**
 * Used when a requested resource is not found, returning a custom status code
 * and optional details about the missing resource.
 * 
 * @class NotFoundException
 * @extends Error
 * @property {number} statusCode - HTTP status code, typically 404 for "not found".
 * @property {any} [details] - Optional additional details about the error.
 *
 * @param {string} message - Error message describing the issue.
 * @param {number} statusCode - Associated HTTP status code.
 * @param {any} [details] - Extra details to aid debugging or reporting.
 */
export class NotFoundException extends Error{
    public statusCode: number;

    constructor(message: string, statusCode: number, public details?: any) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'NotFoundException';
    }
}

/**
 * Represents a "bad request" error, usually due to validation issues in the request payload.
 * Contains a custom status code and optional error details for enhanced reporting.
 * 
 * @class BadRequestError
 * @extends Error
 * @property {number} statusCode - HTTP status code, typically 400 for "bad request".
 * @property {any} [details] - Additional details to aid in debugging or logging.
 *
 * @param {string} message - Error message describing the validation issue.
 * @param {number} statusCode - Associated HTTP status code.
 * @param {any} [details] - Supplementary details relevant to the error.
 */
export class BadRequestError extends Error{
    public statusCode: number;

    constructor(message: string, statusCode: number, public details?: any) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'BadRequestError';
    }
}
