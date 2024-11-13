import axios from 'axios';
import { ClientException } from '../../../utils/error_handling/exceptions/CustomErrors';
import logger from '../../../utils/logger';

export class RestClient {
    public async sendRequest(pan: string, aadhaar: string): Promise<any> {
        try {
            logger.info("REST Client log: Get employee details API")

            const requestPayload = {
                aadhaarNumber: aadhaar,
                pan: pan,
                preLoginFlag: "Y",
                serviceName: "linkAadhaarPreLoginService"
            };

            const headers = {
                'accept': 'application/json, text/plain, */*',
                'accept-encoding': 'gzip, deflate, br, zstd',
                'accept-language': 'en-US,en;q=0.9',
                'connection': 'keep-alive',
                'content-length': '113', // Normally, content-length is handled automatically by Axios, but included here as per your request
                'content-type': 'application/json',
                'cookie': '693c4e2771754eedb1d75ba0debd40d8=f5d1ea3ba3de43e84163d4ac8ea5312d',
                'host': 'eportal.incometax.gov.in',
                'origin': 'https://eportal.incometax.gov.in',
                'referer': 'https://eportal.incometax.gov.in/iec/foservices/',
                'sec-ch-ua': '"Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'sn': 'linkAadhaarPreLoginService',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'
            };

            const response = await axios.post('https://eportal.incometax.gov.in/iec/servicesapi/getEntity',
                requestPayload,
                { headers }
            );

            logger.info("REST Client Log: success getting employee details")
            return response.data;
        } catch (error) {

            logger.error("REST Client Log: error getting employee details")
            throw new ClientException('HTTP request failed', 502);
        }
    }
}
