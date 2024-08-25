import axios from 'axios';
import { ClientException } from '../../../utils/Exceptions/CustomErrors';
import logger from '../../../utils/logger';

export class RestClient {
    public async sendRequest(data: any): Promise<any> {
        try {

            logger.info("REST Client log: Get employee details API")

            const response = await axios.get('https://dummy.restapiexample.com/api/v1/employees', data);

            logger.info("REST Client Log: success getting employee details")
            return response.data;
        } catch (error) {

            logger.error("REST Client Log: error getting employee details")
            throw new ClientException('HTTP request failed', 502);
        }
    }
}
