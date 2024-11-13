import { ConverterException } from "../../../utils/error_handling/exceptions/CustomErrors";
import logger from "../../../utils/logger";

export class PanAadharLinkConverter {
    
    public processResponse(response: any): any {
        try {
            // Process response logic

            console.log(response.data)
            const desc = response.messages?.[0]?.desc ?? 'Description not found';

            logger.info("Converter Log: Converting employee response data ")
            return { data: desc };
        } catch (error) {
            logger.error("Converter Log: Failed Converting response data ")
            throw new ConverterException('Failed to process response', 500);
        }
    }
}