import { APIGatewayProxyEvent } from 'aws-lambda';
import { HandlerException } from '../../utils/error_handling/exceptions/CustomErrors';
import logger from '../../utils/logger';

export class TestHandler {
    public async testMethod(event: APIGatewayProxyEvent): Promise<any> {
        try {
            logger.info('TestHandler: Processing test method request');
            return {
                message: 'Test method executed successfully',
                timestamp: new Date().toISOString()
            };
        } catch (error: any) {
            logger.error(`TestHandler: Error in test method - ${error.message}`);
            throw new HandlerException('Error processing test request', 500);
        }
    }

    public async anotherTestMethod(event: APIGatewayProxyEvent): Promise<any> {
        try {
            logger.info('TestHandler: Processing another test method request');
            const body = event.body ? JSON.parse(event.body) : {};
            return {
                message: 'Another test method executed successfully',
                receivedData: body,
                timestamp: new Date().toISOString()
            };
        } catch (error: any) {
            logger.error(`TestHandler: Error in another test method - ${error.message}`);
            throw new HandlerException('Error processing another test request', 500);
        }
    }
} 