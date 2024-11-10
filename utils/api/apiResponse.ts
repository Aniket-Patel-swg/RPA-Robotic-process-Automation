/**
 * Represents a standardized response format for API responses, ensuring consistent structure across different endpoints.
 * The `ApiResponse` class includes status, message, and data fields for clarity and uniformity, making it easier
 * for clients to interpret the response.

 * @class ApiResponse
 * @property {number} status - HTTP status code of the response (e.g., 200 for success, 404 for not found).
 * @property {string} [message] - Optional descriptive message providing additional context about the response.
 * @property {any} [data] - Optional data associated with the response, typically an object or array returned by the API.

 * @constructor
 * @param {number} status - HTTP status code representing the outcome of the API request.
 * @param {string} [message] - Optional message, often used for success or error descriptions.
 * @param {any} [data] - Optional payload data related to the API response.

 * @example
 * // Success response example
 * const successResponse = new ApiResponse(200, 'Request successful', { userId: 123, name: 'John Doe' });
 * 
 * // Error response example
 * const errorResponse = new ApiResponse(404, 'Resource not found');
 *
 * // JSON output:
 * // successResponse: { "status": 200, "message": "Request successful", "data": { "userId": 123, "name": "John Doe" } }
 * // errorResponse: { "status": 404, "message": "Resource not found" }
 */
export class ApiResponse {
    message?: string;
    data?: any;
    status: number;

    constructor(status: number, message?: string, data?: any) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
}