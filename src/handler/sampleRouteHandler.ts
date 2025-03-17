import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { PanAadhaarLinkHandler } from './panAadhaarLinkHandler';
import { TestHandler } from './testHandler';
import { HandlerException } from '../../utils/error_handling/exceptions/CustomErrors';
import { MiddlewareManager } from '../middleware/middlewareManager';
import { loggingMiddleware, validateRequestMiddleware, errorHandlingMiddleware } from '../middleware/common';
import logger from '../../utils/logger';

interface RouteConfig {
    handler: any;
    method: string;
    handlerMethod?: string;
    requiredFields?: string[];
}

// Initialize handlers
const testHandler = new TestHandler();
const panAadhaarHandler = new PanAadhaarLinkHandler();

// Define available routes and their configurations
const routeConfigs: Record<string, RouteConfig> = {
    '/api/v1/pan-aadhaar/link': {
        handler: panAadhaarHandler,
        method: 'POST',
        handlerMethod: 'handle',
        requiredFields: ['pan', 'aadhaar']
    },
    '/api/v1/test': {
        handler: testHandler,
        method: 'GET',
        handlerMethod: 'testMethod'
    },
    '/api/v1/test/another': {
        handler: testHandler,
        method: 'POST',
        handlerMethod: 'anotherTestMethod'
    }
};

export const routeHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // Get the route configuration
    const routeConfig = routeConfigs[event.path];
    
    if (!routeConfig) {
        logger.error(`Route Handler Log: Invalid route - ${event.path}`);
        return {
            statusCode: 404,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ 
                status: 'error',
                message: 'Route not found',
                availableRoutes: Object.keys(routeConfigs)
            })
        };
    }

    // Validate HTTP method
    if (event.httpMethod !== routeConfig.method) {
        return {
            statusCode: 405,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                status: 'error',
                message: `Method ${event.httpMethod} not allowed. Expected ${routeConfig.method}`
            })
        };
    }

    const middlewareManager = new MiddlewareManager();

    // Add common middlewares
    middlewareManager.use(loggingMiddleware);
    middlewareManager.use(validateRequestMiddleware(routeConfig.requiredFields));
    middlewareManager.use(errorHandlingMiddleware);

    // Create the handler function
    const handlerMethod = routeConfig.handlerMethod || 'handle';
    const handlerFunction = async (evt: APIGatewayProxyEvent) => {
        if (typeof routeConfig.handler[handlerMethod] !== 'function') {
            throw new HandlerException(`Handler method '${handlerMethod}' not found`, 500);
        }
        return await routeConfig.handler[handlerMethod](evt);
    };

    // Execute the middleware chain with the handler
    return await middlewareManager.execute(event, handlerFunction);
};
