import { Schema } from './validationSchema';
import { validate } from './validate';
import { testZodSchema } from './zodSchema';

const testData = {
    name: "John",
    age: 25,
    email: "john.doe@example.com",
    address: {
        city: "New York",
        postalCode: "12345",
    },
};

function measureValidation() {

    const customSchema: Schema = {
        name: { type: "string", required: true, minLength: 3, maxLength: 20 },
        age: { type: "number", required: true, min: 18, max: 100 },
        email: { type: "string", required: true },
        address: {
            type: "object",
            required: true,
            properties: {
                city: { type: "string", required: true },
                postalCode: { type: "string", required: true, pattern: /^\d{5}$/ },
            },
        },
    };

    console.time('Custom Validation');
    const customErrors = validate(customSchema, testData);
    console.timeEnd('Custom Validation');
    console.log('Custom Validation Errors:', customErrors);

    // Measure Zod validation
    console.time('Zod Validation');
    const zodErrors = testZodSchema.safeParse(testData);
    console.timeEnd('Zod Validation');

    if (!zodErrors.success) {
        console.log('Zod Validation Errors:', zodErrors.error.errors);
    } else {
        console.log('Zod Validation Success:', zodErrors.data);
    }
}

measureValidation();
