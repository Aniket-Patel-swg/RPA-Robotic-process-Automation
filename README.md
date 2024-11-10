## For installing tempalte run: 
npx serverless-rpa-package project-name

# RPA (Robotic Process Automation)
Robotic Process Automation (RPA) aims to replicate human actions. This project emulates repetitive human interactions with websites and provides a basic structure that can be adopted for specific use cases. It includes use cases involving data collection from research papers using a given serverless architecture.  

# Lambda Coding Pattern 
The Lambda coding pattern is designed to streamline the development process. The principle of separation of concerns is applied for modular and maintainable code by dividing the application logic into route handler, handler, service, and client, where each layer has its own specific task or work.

## 1) Route Handler
As the name suggests, the request handler directs incoming requests based on the method and path. It serves as the entry point of the Lambda function and is responsible for receiving and mapping incoming HTTP requests to the appropriate handler.
  * Map the request to the appropriate Handler based on routing logic.
## 2) Handler
Intermediary between the Route Handler and the Service layer. It coordinates the request and invokes the appropriate Service layer. 
   * Parse and validate incoming requests.`
   * Format the response to be returned to the API user.
   * Use of middleware for mapping request/response objects.
## 3) Service
The service layer is an essential component that encapsulates business logic, orchestration, and complex operations, requiring coordination between multiple clients and external services.
   * Implement complex business logic.
   * Interaction with Clients for requesting data.
   * Handle cross-cutting concerns (eg: on the success of the Client storing that data in the DynamoDB table)
   * Converting data using appropriate converters.
## 4) Client
The Client layer is responsible for interacting with external websites, handling their response data, and managing errors. it contains service clients and REST clients.
   ## 1. Service Client
   It acts as an adapter and calls the REST client (which will handle the actual interaction). The service client manages the logic for calling REST clients according to the requirement and also handles errors thrown by external websites.
   * Calls REST client.
   * Business logic for calling REST clients. 
   * error handling (majorly based on errors thrown by 3rd party websites)
   ## 2. REST Client
   REST Client executes RESTful API calls to external systems.
   * Make RESTFul API call with appropriate request details.
   * Return response from an external website to the Service Client.

### Flow diagram for architecture
![diagram-export-8-23-2024-11_56_58-PM](https://github.com/user-attachments/assets/8772470c-2775-4c30-8a19-16b8a28b2d02)

### Flow diagram for middleware before hitting handler
![diagram-export-8-23-2024-8_04_36-PM](https://github.com/user-attachments/assets/8647fc40-6897-4866-b176-75fddfb8963a)
