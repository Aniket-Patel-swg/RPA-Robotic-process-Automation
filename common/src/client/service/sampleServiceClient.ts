import { RestClient } from '../REST/sampleRESTClient';
import { ServiceException } from '../../../Exceptions/CustomErrors'

export class ServiceClient {
    private restClient: RestClient;

    constructor() {
        this.restClient = new RestClient();
    }

    public async callExternalService(data: any): Promise<any> {
        try {
            const response = await this.restClient.sendRequest(data);
            return response;
        } catch (error) {
            throw new ServiceException('External service call failed', 502);
        }
    }
}
