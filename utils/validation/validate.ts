import { Schema } from "./validationSchema";

/**
 * Validates data against a defined schema, checking for required fields, data types,
 * and additional constraints (e.g., min/max values, pattern matching).
 * 
 * @function validate
 * @param {Schema} schema - A validation schema specifying rules for each field,
 * including type, required status, minimum/maximum constraints, and pattern matching.
 * @param {any} data - The input data to be validated against the schema.
 * @returns {string[]} - An array of validation error messages. If validation passes,
 * the array will be empty.
 * 
 * @description This function iterates through each key in the provided schema to validate
 * the corresponding field in the data. It performs the following checks:
 * - **Required Fields**: Ensures required fields are present.
 * - **Type Validation**: Validates the type (e.g., string, number, boolean, array, object, date).
 * - **String Constraints**: Checks min/max length and pattern matching for strings.
 * - **Number Constraints**: Enforces min/max values for numbers.
 * - **Array Validation**: Validates arrays of strings or numbers.
 * - **Object Validation**: Supports nested object validation through recursive calls.
 * - **Enum Validation**: Confirms values match one of a specified list.
 * 
 * @example
 * const schema = {
 *     name: { type: "string", required: true, minLength: 3 },
 *     age: { type: "number", min: 18, max: 99 },
 *     preferences: { type: "array:string" },
 * };
 * 
 * const data = { name: "Alice", age: 25, preferences: ["reading", "swimming"] };
 * const errors = validate(schema, data);
 * 
 * @remarks
 * This function provides a centralized validation approach to enforce data integrity and 
 * prevent invalid inputs from entering the application, supporting a uniform data format. 
 * If validation fails, it returns an array of descriptive error messages, highlighting the 
 * fields that do not meet the specified criteria.
 */
export function validate(schema: Schema, data: any): string[] {
    try {

        let errors: string[] = [];

        for (const key in schema) {
            const rules = schema[key];
            const value = data[key];

            // Check if the field is required and missing
            if (rules.required && (value === undefined || value === null)) {
                errors.push(`${key} is required.`);
                continue;
            }

            // Skip further checks if the value is not required and is not present
            if (value === undefined || value === null) {
                continue;
            }

            // Check the type of the value
            if (rules.type) {
                switch (rules.type) {
                    case "string":
                        if (typeof value !== "string") {
                            errors.push(`${key} must be a string.`);
                        }
                        if (rules.minLength && value.length < rules.minLength) {
                            errors.push(`${key} must be at least ${rules.minLength} characters long.`);
                        }
                        if (rules.maxLength && value.length > rules.maxLength) {
                            errors.push(`${key} must be no more than ${rules.maxLength} characters long.`);
                        }
                        if (rules.pattern && !rules.pattern.test(value)) {
                            errors.push(`${key} must match the pattern ${rules.pattern}.`);
                        }
                        break;

                    case "number":
                        if (typeof value !== "number") {
                            errors.push(`${key} must be a number.`);
                        }
                        if (rules.min && value < rules.min) {
                            errors.push(`${key} must be at least ${rules.min}.`);
                        }
                        if (rules.max && value > rules.max) {
                            errors.push(`${key} must be no more than ${rules.max}.`);
                        }
                        break;

                    case "boolean":
                        if (typeof value !== "boolean") {
                            errors.push(`${key} must be a boolean.`);
                        }
                        break;

                    case "array:string":
                        if (!Array.isArray(value) || !value.every(item => typeof item === "string")) {
                            errors.push(`${key} must be an array of strings.`);
                        }
                        break;

                    case "array:number":
                        if (!Array.isArray(value) || !value.every(item => typeof item === "number")) {
                            errors.push(`${key} must be an array of numbers.`);
                        }
                        break;

                    case "object":
                        if (typeof value !== "object" || Array.isArray(value)) {
                            errors.push(`${key} must be an object.`);
                        } else if (rules.properties) {
                            // Recursively validate nested object
                            const nestedErrors = validate(rules.properties, value);
                            errors.push(...nestedErrors.map(err => `${key}.${err}`));
                        }
                        break;

                    case "date":
                        if (isNaN(Date.parse(value))) {
                            errors.push(`${key} must be a valid date.`);
                        }
                        break;

                    case "enum":
                        if (rules.enum && !rules.enum.includes(value)) {
                            errors.push(`${key} must be one of [${rules.enum.join(", ")}].`);
                        }
                        break;

                    default:
                        errors.push(`${key} has an unknown type: ${rules.type}.`);
                }
            }
        }

        return errors;
    } catch (error) {
        console.log(error);
        throw error;
    }
}