import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { MiddlewareFunction, ResponseFormatter } from './types';
import { HandlerException } from '../../utils/error_handling/exceptions/CustomErrors';
import logger from '../../utils/logger';

// Response formatter middleware
export const responseFormatter: ResponseFormatter = {
    formatSuccess: (data: any): APIGatewayProxyResult => ({
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            status: 'success',
            data
        })
    }),

    formatError: (error: any): APIGatewayProxyResult => ({
        statusCode: error instanceof HandlerException ? error.statusCode : 500,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            status: 'error',
            message: error instanceof Error ? error.message : 'Internal Server Error'
        })
    })
};

// Logging middleware
export const loggingMiddleware: MiddlewareFunction = async (event, context, next) => {
    try {
        logger.info(`Request received: ${event.httpMethod} ${event.path}`);
        logger.info(`Request body: ${event.body || 'No body'}`);

        const response = await next();

        logger.info(`Response status: ${response.statusCode}`);
        logger.info(`Response body: ${response.body}`);

        return response;
    } catch (error) {
        logger.error(`Error in request: ${error instanceof Error ? error.message : 'Unknown error'}`);
        throw error;
    }
};

// Request validation middleware
export const validateRequestMiddleware = (requiredFields?: string[]): MiddlewareFunction => {
    return async (event, context, next) => {
        try {
            if (requiredFields && event.body) {
                const body = JSON.parse(event.body);
                const missingFields = requiredFields.filter(field => !body[field]);
                
                if (missingFields.length > 0) {
                    throw new HandlerException(`Missing required fields: ${missingFields.join(', ')}`, 400);
                }
            }

            return await next();
        } catch (error) {
            if (error instanceof HandlerException) {
                throw error;
            }
            throw new HandlerException('Invalid request body', 400);
        }
    };
};

// Error handling middleware
export const errorHandlingMiddleware: MiddlewareFunction = async (event, context, next) => {
    try {
        return await next();
    } catch (error) {
        return responseFormatter.formatError(error);
    }
}; 