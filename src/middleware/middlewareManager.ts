import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { MiddlewareFunction } from './types';

export class MiddlewareManager {
    private middlewares: MiddlewareFunction[] = [];

    public use(middleware: MiddlewareFunction): void {
        this.middlewares.push(middleware);
    }

    public async execute(
        event: APIGatewayProxyEvent,
        handler: (event: APIGatewayProxyEvent) => Promise<any>
    ): Promise<APIGatewayProxyResult> {
        const context: { [key: string]: any } = {};

        const executeMiddlewareChain = async (index: number): Promise<APIGatewayProxyResult> => {
            if (index === this.middlewares.length) {
                const result = await handler(event);
                return {
                    statusCode: 200,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify({
                        status: 'success',
                        data: result
                    })
                };
            }

            const nextMiddleware = this.middlewares[index];
            return await nextMiddleware(event, context, () => executeMiddlewareChain(index + 1));
        };

        return executeMiddlewareChain(0);
    }
} 