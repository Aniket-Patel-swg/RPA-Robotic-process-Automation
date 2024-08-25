import { RestClient } from '../REST/sampleRESTClient';
import { ServiceException } from '../../../utils/Exceptions/CustomErrors'
import logger from '../../../utils/logger';

export class ServiceClient {
    private restClient: RestClient;

    constructor() {
        this.restClient = new RestClient();
    }

    public async callExternalService(data: any): Promise<any> {
        try {

            logger.info("Service client Log: getting employee details");
            const response = await this.restClient.sendRequest(data);

            logger.info("Service client Log: successfully got employee details")
            return response;
        } catch (error) {

            logger.error("Service Client Log: error getting employee details")
            throw new ServiceException('External service call failed', 502);
        }
    }
}
