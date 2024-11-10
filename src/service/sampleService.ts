import { ServiceClient } from '../client/service/sampleServiceClient';
import { ServiceException, ConverterException } from '../../utils/error_handling/exceptions/CustomErrors';
import logger from '../../utils/logger';

export class Service {
    private serviceClient: ServiceClient;

    constructor() {
        this.serviceClient = new ServiceClient();
    }

    public async performBusinessLogic(data: any): Promise<any> {
        try {

            logger.info('Service Log: get employee details API')

            // Perform any necessary data transformation
            const transformedData = this.transformData(data);

            logger.info("Service Log: Transform Data successfull")

            // Call the Service Client
            const response = await this.serviceClient.callExternalService(transformedData);

            logger.info("Service Log: succesfully got employee details")

            // Perform post-processing if necessary
            const convertedData = this.processResponse(response);

            logger.info("Service Log: successfully converted response")

            return convertedData;
        } catch (error) {

            logger.error("Service Log: error getting employee data")

            if (error instanceof ConverterException) {
                throw new ServiceException('Data transformation failed', 400);
            }
            throw new ServiceException('Error in business logic execution', 500);
        }
    }

    private transformData(data: any): any {
        try {
            // Your Transformation logic
            
            logger.info("Converter Log: transforming employee data")
            return { transformedData: data };
        } catch (error) {
            logger.error("Converter Log: error transforming employee details")
            throw new ConverterException('Failed to transform data');
        }
    }

    private processResponse(response: any): any {
        try {
            // Process response logic

            logger.info("Converter Log: Converting employee response data ")
            return { processedResponse: response };
        } catch (error) {
            logger.error("Converter Log: Failed Converting employee response data ")
            throw new ConverterException('Failed to process response');
        }
    }
}
