import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export interface MiddlewareFunction {
    (
        event: APIGatewayProxyEvent,
        context: { [key: string]: any },
        next: () => Promise<APIGatewayProxyResult>
    ): Promise<APIGatewayProxyResult>;
}

export interface ResponseFormatter {
    formatSuccess: (data: any) => APIGatewayProxyResult;
    formatError: (error: any) => APIGatewayProxyResult;
} 