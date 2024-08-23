import axios from 'axios';
import { ServiceException } from '../../errors/CustomErrors';

export class RestClient {
    public async sendRequest(data: any): Promise<any> {
        try {
            const response = await axios.post('https://api.example.com/endpoint', data);
            return response.data;
        } catch (error) {
            throw new ServiceException('HTTP request failed', 502);
        }
    }
}
