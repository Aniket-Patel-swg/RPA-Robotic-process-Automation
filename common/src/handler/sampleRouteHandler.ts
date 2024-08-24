import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Handler } from './sampleHandler';
import { HandlerException } from '../../Exceptions/CustomErrors';

export const routeHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const handler = new Handler();
        const response = await handler.handle(event);
        return {
            statusCode: 200,
            body: JSON.stringify(response),
        };
    } catch (error) {
        if (error instanceof HandlerException) {
            return {
                statusCode: error.statusCode || 500,
                body: JSON.stringify({ message: error.message }),
            };
        }
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' }),
        };
    }
};
