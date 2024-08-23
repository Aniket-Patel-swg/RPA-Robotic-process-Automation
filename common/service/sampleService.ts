import { ServiceClient } from '../client/service/sampleServiceClient';
import { ServiceException, ConverterException } from '../errors/CustomErrors';

export class Service {
    private serviceClient: ServiceClient;

    constructor() {
        this.serviceClient = new ServiceClient();
    }

    public async performBusinessLogic(data: any): Promise<any> {
        try {
            // Perform any necessary data transformation
            const transformedData = this.transformData(data);

            // Call the Service Client
            const response = await this.serviceClient.callExternalService(transformedData);

            // Perform post-processing if necessary
            return this.processResponse(response);
        } catch (error) {
            if (error instanceof ConverterException) {
                throw new ServiceException('Data transformation failed', 400);
            }
            throw new ServiceException('Error in business logic execution', 500);
        }
    }

    private transformData(data: any): any {
        try {
            // Transformation logic
            return { transformedData: data };
        } catch (error) {
            throw new ConverterException('Failed to transform data');
        }
    }

    private processResponse(response: any): any {
        try {
            // Process response logic
            return { processedResponse: response };
        } catch (error) {
            throw new ConverterException('Failed to process response');
        }
    }
}
