import { APIGatewayProxyEvent } from 'aws-lambda';
import { Service } from '../service/sampleService';
import { HandlerException, ServiceException } from '../../utils/error_handling/exceptions/CustomErrors';
import logger from '../../utils/logger';

export class Handler {
    private service: Service;

    constructor() {
        this.service = new Service();
    }

    public async handle(event: APIGatewayProxyEvent): Promise<any> {
        try {

            logger.info('Handler log: getting exployee details API')

            const requestData = JSON.parse(event.body!);

            const pan = requestData.pan;

            const aadhaar = requestData.aadhaar;

            if (!pan || !aadhaar) {
                throw new HandlerException('Pan number not provided', 400);
            }

            const result = await this.service.performBusinessLogic(pan, aadhaar);

            logger.info('Handler Log: Success getting employee details')

            return result;
        } catch (error: any) {

            logger.error(`Handler Log: error getting employee details, with code: ${error.code}, message: ${error.message}`)

            if (error instanceof ServiceException) {

                throw new HandlerException(error.message, error.statusCode);
            }
            throw new HandlerException('Error processing request', 500);
        }
    }
}
