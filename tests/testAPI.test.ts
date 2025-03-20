import { APIGatewayProxyEvent } from 'aws-lambda';
import { routeHandler } from '../src/handler/sampleRouteHandler';
import { Service } from '../src/service/sampleService';

// Mock the Service class
jest.mock('../src/service/sampleService');

// Mock logger
const mockLogger = {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn()
};

jest.mock('../src/utils/logger', () => ({
    __esModule: true,
    default: mockLogger
}));

describe('API Integration Tests', () => {
    let mockEvent: APIGatewayProxyEvent;

    beforeEach(() => {
        // Reset mocks
        jest.clearAllMocks();

        // Setup basic mock event
        mockEvent = {
            body: JSON.stringify({ 
                pan: "ABCDE1234F", 
                aadhaar: "123456789012" 
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer token",
            },
            multiValueHeaders: {
                "Accept": ["text/html", "application/json"],
            },
            httpMethod: "POST",
            isBase64Encoded: false,
            path: "/api/v1/pan-aadhaar/link",
            pathParameters: {
                id: "12345",
            },
            queryStringParameters: {
                param1: "value1",
            },
            multiValueQueryStringParameters: {
                param1: ["value1", "value2"],
            },
            stageVariables: {
                stageName: "prod",
            },
            requestContext: {
                accountId: "123456789012",
                apiId: "api-id",
                authorizer: {},
                protocol: "HTTP/1.1",
                httpMethod: "POST",
                identity: {
                    accessKey: null,
                    accountId: null,
                    apiKey: null,
                    apiKeyId: null,
                    caller: null,
                    cognitoAuthenticationProvider: null,
                    cognitoAuthenticationType: null,
                    cognitoIdentityId: null,
                    cognitoIdentityPoolId: null,
                    principalOrgId: null,
                    clientCert: null,
                    sourceIp: "192.168.0.1",
                    user: null,
                    userAgent: "PostmanRuntime/7.26.8",
                    userArn: null,
                },
                path: "/api/v1/pan-aadhaar/link",
                stage: "prod",
                requestId: "c4b6d6d1-0f9d-4e2a-bef2-abc123456789",
                requestTimeEpoch: 1610489450000,
                resourceId: "resource-id",
                resourcePath: "/api/v1/pan-aadhaar/link",
                domainName: "api.example.com",
                domainPrefix: "api",
                requestTime: "12/Jan/2021:19:30:50 +0000",
            },
            resource: "/api/v1/pan-aadhaar/link",
        };

        // Mock service response
        (Service.prototype.performBusinessLogic as jest.Mock).mockResolvedValue({
            status: 'success',
            message: 'PAN-Aadhaar link verified',
            data: {
                pan: "ABCDE1234F",
                aadhaar: "123456789012",
                verificationStatus: "VERIFIED"
            }
        });
    });

    describe('Route Handler Integration Tests', () => {
        test('should process PAN-Aadhaar link request through middleware chain', async () => {
            // Log start time
            const startTime = Date.now();

            const response = await routeHandler(mockEvent);

            // Log end time and calculate duration
            const endTime = Date.now();
            const timeTaken = endTime - startTime;

            // Log performance metrics
            console.log(`Time taken by API: ${timeTaken} ms`);

            // Verify response structure
            expect(response.statusCode).toBe(200);
            const body = JSON.parse(response.body);
            expect(body.status).toBe('success');
            expect(body.data).toBeDefined();

            // Verify middleware execution
            expect(mockLogger.info).toHaveBeenCalledWith(
                expect.stringContaining('Request received')
            );
        });

        test('should handle validation errors correctly', async () => {
            // Missing required field
            mockEvent.body = JSON.stringify({ pan: "ABCDE1234F" });

            const response = await routeHandler(mockEvent);

            expect(response.statusCode).toBe(400);
            const body = JSON.parse(response.body);
            expect(body.status).toBe('error');
            expect(body.message).toContain('Missing required fields');
        });

        test('should handle service errors correctly', async () => {
            // Mock service error
            (Service.prototype.performBusinessLogic as jest.Mock).mockRejectedValue(
                new Error('Service unavailable')
            );

            const response = await routeHandler(mockEvent);

            expect(response.statusCode).toBe(500);
            const body = JSON.parse(response.body);
            expect(body.status).toBe('error');
        });

        test('should handle invalid JSON in request body', async () => {
            mockEvent.body = 'invalid-json';

            const response = await routeHandler(mockEvent);

            expect(response.statusCode).toBe(400);
            const body = JSON.parse(response.body);
            expect(body.status).toBe('error');
            expect(body.message).toBe('Invalid request body');
        });

        test('should handle invalid route', async () => {
            mockEvent.path = '/invalid/route';

            const response = await routeHandler(mockEvent);

            expect(response.statusCode).toBe(404);
            const body = JSON.parse(response.body);
            expect(body.status).toBe('error');
            expect(body.message).toBe('Route not found');
        });
    });
});
