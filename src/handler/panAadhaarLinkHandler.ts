import { APIGatewayProxyEvent } from 'aws-lambda';
import { Service } from '../service/sampleService';
import { HandlerException, ServiceException } from '../../utils/error_handling/exceptions/CustomErrors';
import logger from '../../utils/logger';

export class PanAadhaarLinkHandler {
    private service: Service;

    constructor() {
        this.service = new Service();
    }

    public async handle(event: APIGatewayProxyEvent): Promise<any> {
        try {
            logger.info('PanAadhaarLinkHandler: Processing PAN-Aadhaar link request');

            const requestData = JSON.parse(event.body!);
            const { pan, aadhaar } = requestData;

            if (!pan || !aadhaar) {
                throw new HandlerException('PAN and Aadhaar numbers are required', 400);
            }

            const result = await this.service.performBusinessLogic(pan, aadhaar);
            
            logger.info('PanAadhaarLinkHandler: Successfully processed PAN-Aadhaar link request');
            return result;
        } catch (error: any) {
            logger.error(`PanAadhaarLinkHandler: Error processing request - ${error.message}`);
            
            if (error instanceof ServiceException) {
                throw new HandlerException(error.message, error.statusCode);
            }
            throw new HandlerException('Error processing PAN-Aadhaar link request', 500);
        }
    }
} 