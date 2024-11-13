import { ServiceClient } from '../client/service/sampleServiceClient';
import { ServiceException, ConverterException } from '../../utils/error_handling/exceptions/CustomErrors';
import logger from '../../utils/logger';
import { RequestConverter } from '../converter/request/sampleResponseConverter';
import { PanAadharLinkConverter } from '../converter/response/panAadharLinkConverter';

export class Service {
    private serviceClient: ServiceClient;
    private requestConverter: RequestConverter;
    private responseConverter: PanAadharLinkConverter;

    constructor() {
        this.serviceClient = new ServiceClient();
        this.requestConverter = new RequestConverter();
        this.responseConverter = new PanAadharLinkConverter();
    }

    public async performBusinessLogic(pan: string, aadhaar: string): Promise<any> {
        try {

            logger.info('Service Log: get employee details API')

            // Perform any necessary data transformation

            logger.info("Service Log: Transform Data successfull")

            // Call the Service Client
            const response = await this.serviceClient.callExternalService(pan, aadhaar);

            logger.info("Service Log: succesfully got employee details")

            // Perform post-processing if necessary
            const convertedData = await this.responseConverter.processResponse(response);

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

    
}
