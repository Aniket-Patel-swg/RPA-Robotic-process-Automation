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



# utils

## ApiResponse Class

The `ApiResponse` class standardizes the format of API responses, providing a consistent structure for returning status codes, messages, and data payloads across all endpoints.

## Features
- **Standardized Response**: Ensures all endpoints return a uniform structure.
- **Flexible Fields**: Includes `status`, `message`, and `data` fields for various use cases.
- **Improved Client Handling**: Simplifies API response handling for clients by providing consistent success and error formats.

## Installation
Import `ApiResponse` as needed in your API modules:
```typescript
import { ApiResponse } from 'serverless-rpa-package';
```

## Retry Helper

A utility function that retries an asynchronous function upon failure, useful for handling transient errors, such as network request failures or external API errors. It allows for the maximum number of retry attempts and a delay between retries.

## Features

- Retry a function on failure.
- Customizable number of retries and delay between attempts.
- Helps with handling intermittent issues, like network instability.

## Installation
Import `withRetry` as needed in your API modules:
```typescript
import { withRetry } from 'serverless-rpa-package';
```

# Validate Function

A utility function that validates input data against a defined schema. It ensures that the provided data conforms to required types, constraints (e.g., min/max values, patterns), and handles nested objects and arrays. This function is ideal for validating API request bodies, form submissions, or any other data structures.

## Features

- **Required Fields**: Ensures that required fields are present.
- **Type Validation**: Supports validation for various types (string, number, boolean, array, object, date).
- **String Constraints**: Validates string length and patterns.
- **Number Constraints**: Enforces number limits (min/max).
- **Array Validation**: Checks arrays for proper types (e.g., array of strings or numbers).
- **Object Validation**: Supports nested object validation through recursive checks.
- **Enum Validation**: Ensures values match one of the allowed enum values.

## Installation

Install the package that contains the `validate` function:

```typescript
import { validate } from 'serverless-rpa-package';
```
