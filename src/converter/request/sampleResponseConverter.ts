import { ConverterException } from "../../../utils/error_handling/exceptions/CustomErrors";
import logger from "../../../utils/logger";

export class RequestConverter {
    public transformData(data: any): any {
        try {
            // Your Transformation logic

            logger.info("Converter Log: transforming employee data")
            return { transformedData: data };
        } catch (error) {
            logger.error("Converter Log: error transforming employee details")
            throw new ConverterException('Failed to transform data', 500);
        }
    }
}