import { APIGatewayProxyEvent } from 'aws-lambda';
import { Service } from '../service/sampleService';
import { HandlerException, ServiceException } from '../errors/CustomErrors';

export class Handler {
    private service: Service;

    constructor() {
        this.service = new Service();
    }

    public async handle(event: APIGatewayProxyEvent): Promise<any> {
        try {
            const requestData = JSON.parse(event.body!);
            const result = await this.service.performBusinessLogic(requestData);
            return result;
        } catch (error) {
            if (error instanceof ServiceException) {
                throw new HandlerException(error.message, error.statusCode);
            }
            throw new HandlerException('Error processing request', 500);
        }
    }
}
