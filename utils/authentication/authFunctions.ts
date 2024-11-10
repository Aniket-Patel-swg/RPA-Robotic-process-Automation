import { APIGatewayProxyEvent } from 'aws-lambda';
import { verifyToken } from './auth';

/**
 * Middleware to verify a JWT token for AWS Lambda.
 * @param event - The AWS API Gateway Proxy event.
 * @returns The decoded user info if token is valid.
 */
export const authenticate = (event: APIGatewayProxyEvent) => {
    const authHeader = event.headers['Authorization'] || event.headers['authorization'];

    if (!authHeader) {
        throw new Error('Authorization header missing');
    }

    const token = authHeader.split(' ')[1]; // Expecting 'Bearer <token>'
    if (!token) {
        throw new Error('Token missing');
    }

    return verifyToken(token);
};
