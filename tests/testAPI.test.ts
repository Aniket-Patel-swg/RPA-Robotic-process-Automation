import { APIGatewayProxyEvent } from 'aws-lambda';
import { routeHandler } from '../src/handler/sampleRouteHandler';
import { Handler } from '../src/handler/sampleHandler';

test('Checking if API is working or not', async () => {

    // note this is an example event, which contains all the keys, you can edit as per your reqirement. 
    const event: APIGatewayProxyEvent = {
        body: JSON.stringify({ pan: "your-pan", aadhaar: "your-aadhaar" }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer token",
        },
        multiValueHeaders: {
            "Accept": ["text/html", "application/json"],
        },
        httpMethod: "POST",
        isBase64Encoded: false,
        path: "/myapi/resource",
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
            path: "/myapi/resource",
            stage: "prod",
            requestId: "c4b6d6d1-0f9d-4e2a-bef2-abc123456789",
            requestTimeEpoch: 1610489450000,
            resourceId: "resource-id",
            resourcePath: "/myapi/resource",
            domainName: "api.example.com",
            domainPrefix: "api",
            requestTime: "12/Jan/2021:19:30:50 +0000",
        },
        resource: "/myapi/resource",
    };

    const handler = new Handler();

    // Log start time
    const startTime = Date.now();

    const response = await handler.handle(event);

    const endTime = Date.now();
    const timeTaken = endTime - startTime;

    console.log("Response: ", response.data);
    console.log(`Time taken by API: ${timeTaken} ms`);

}, 30000)
