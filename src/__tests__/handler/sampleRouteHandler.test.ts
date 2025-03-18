import { APIGatewayProxyEvent } from 'aws-lambda';
import { routeHandler } from '../../handler/sampleRouteHandler';
import { Handler } from '../../handler/sampleHandler';
import { Service } from '../../service/sampleService';

// Mock the Service class
jest.mock('../../service/sampleService');
jest.mock('../../utils/logger');

describe('Route Handler Tests', () => {
    let mockEvent: APIGatewayProxyEvent;

    beforeEach(() => {
        // Reset all mocks before each test
        jest.clearAllMocks();
        
        // Setup basic mock event
        mockEvent = {
            httpMethod: 'POST',
            path: '/api/v1/pan-aadhaar/link',
            body: JSON.stringify({
                pan: 'ABCDE1234F',
                aadhaar: '123456789012'
            }),
            headers: {},
            isBase64Encoded: false,
            multiValueHeaders: {},
            multiValueQueryStringParameters: null,
            pathParameters: null,
            queryStringParameters: null,
            requestContext: {} as any,
            resource: '',
            stageVariables: null
        };

        // Mock service response
        (Service.prototype.performBusinessLogic as jest.Mock).mockResolvedValue({
            status: 'success',
            message: 'PAN-Aadhaar link verified'
        });
    });

    describe('Valid Routes', () => {
        test('should handle PAN-Aadhaar link request successfully', async () => {
            const response = await routeHandler(mockEvent);

            expect(response.statusCode).toBe(200);
            const body = JSON.parse(response.body);
            expect(body.status).toBe('success');
            expect(Service.prototype.performBusinessLogic).toHaveBeenCalledWith(
                'ABCDE1234F',
                '123456789012'
            );
        });

        test('should handle test route successfully', async () => {
            mockEvent.httpMethod = 'GET';
            mockEvent.path = '/api/v1/test';
            mockEvent.body = null;

            const response = await routeHandler(mockEvent);

            expect(response.statusCode).toBe(200);
            const body = JSON.parse(response.body);
            expect(body.status).toBe('success');
        });
    });

    describe('Error Handling', () => {
        test('should return 404 for invalid route', async () => {
            mockEvent.path = '/invalid/route';

            const response = await routeHandler(mockEvent);

            expect(response.statusCode).toBe(404);
            const body = JSON.parse(response.body);
            expect(body.status).toBe('error');
            expect(body.message).toBe('Route not found');
        });

        test('should return 405 for invalid HTTP method', async () => {
            mockEvent.httpMethod = 'DELETE';

            const response = await routeHandler(mockEvent);

            expect(response.statusCode).toBe(405);
            const body = JSON.parse(response.body);
            expect(body.status).toBe('error');
            expect(body.message).toContain('Method DELETE not allowed');
        });

        test('should return 400 for missing required fields', async () => {
            mockEvent.body = JSON.stringify({ pan: 'ABCDE1234F' }); // Missing aadhaar

            const response = await routeHandler(mockEvent);

            expect(response.statusCode).toBe(400);
            const body = JSON.parse(response.body);
            expect(body.status).toBe('error');
            expect(body.message).toContain('Missing required fields');
        });

        test('should return 500 for service error', async () => {
            (Service.prototype.performBusinessLogic as jest.Mock).mockRejectedValue(
                new Error('Service error')
            );

            const response = await routeHandler(mockEvent);

            expect(response.statusCode).toBe(500);
            const body = JSON.parse(response.body);
            expect(body.status).toBe('error');
        });
    });

    describe('Middleware Functionality', () => {
        test('should log request and response', async () => {
            const logger = require('../../utils/logger').default;

            await routeHandler(mockEvent);

            expect(logger.info).toHaveBeenCalledWith(
                expect.stringContaining('Request received')
            );
            expect(logger.info).toHaveBeenCalledWith(
                expect.stringContaining('Response status')
            );
        });

        test('should validate request body format', async () => {
            mockEvent.body = 'invalid json';

            const response = await routeHandler(mockEvent);

            expect(response.statusCode).toBe(400);
            const body = JSON.parse(response.body);
            expect(body.status).toBe('error');
            expect(body.message).toBe('Invalid request body');
        });
    });
}); 