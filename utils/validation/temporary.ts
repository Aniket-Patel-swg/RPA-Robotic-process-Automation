import { Schema } from "./validationSchema";

const customSchema: Schema = {
    name: {
        required: true,
        type: "string",
        minLength: 1,
        maxLength: 100,
    },
    age: {
        required: true,
        type: "number",
        min: 0,
        max: 120,
    },
    email: {
        required: true,
        type: "string",
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    address: {
        required: true,
        type: "object",
        properties: {
            street: { required: true, type: "string" },
            city: { required: true, type: "string" },
            postalCode: { required: true, type: "string" },
            country: { required: true, type: "string" },
            coordinates: {
                required: true,
                type: "object",
                properties: {
                    latitude: { required: true, type: "number", min: -90, max: 90 },
                    longitude: { required: true, type: "number", min: -180, max: 180 },
                },
            },
        },
    },
    phoneNumbers: {
        required: true,
        type: "array",
        properties: {
            type: { required: true, type: "string", enum: ["mobile", "home", "work"] },
            number: { required: true, type: "string" },
        },
    },
    roles: {
        required: true,
        type: "array:string",
        enum: ["admin", "user", "editor", "guest"],
    },
    preferences: {
        required: true,
        type: "object",
        properties: {
            theme: { required: true, type: "string", enum: ["dark", "light"] },
            notifications: {
                required: true,
                type: "object",
                properties: {
                    email: { required: true, type: "boolean" },
                    sms: { required: true, type: "boolean" },
                    push: { required: true, type: "boolean" },
                },
            },
            language: { required: true, type: "string" },
            currency: { required: true, type: "string" },
        },
    },
    orders: {
        required: true,
        type: "array",
        properties: {
            id: { required: true, type: "string" },
            items: {
                required: true,
                type: "array",
                properties: {
                    productId: { required: true, type: "string" },
                    quantity: { required: true, type: "number", min: 1 },
                    price: { required: true, type: "number", min: 0 },
                },
            },
            total: { required: true, type: "number", min: 0 },
            status: { required: true, type: "string", enum: ["shipped", "processing", "cancelled"] },
            shipment: {
                required: false,
                type: "object",
                properties: {
                    trackingNumber: { required: true, type: "string" },
                    carrier: { required: true, type: "string" },
                    estimatedDelivery: { required: true, type: "date" },
                    address: {
                        required: true,
                        type: "object",
                        properties: {
                            street: { required: true, type: "string" },
                            city: { required: true, type: "string" },
                            postalCode: { required: true, type: "string" },
                            country: { required: true, type: "string" },
                        },
                    },
                },
            },
        },
    },
    metadata: {
        required: true,
        type: "object",
        properties: {
            createdAt: { required: true, type: "date" },
            updatedAt: { required: true, type: "date" },
            tags: {
                required: true,
                type: "array:string",
            },
        },
    },
    socialAccounts: {
        required: true,
        type: "array",
        properties: {
            platform: { required: true, type: "string" },
            username: { required: true, type: "string" },
            followers: { required: false, type: "number", min: 0 },
            connections: { required: false, type: "number", min: 0 },
            verified: { required: true, type: "boolean" },
        },
    },
    documents: {
        required: true,
        type: "object",
        properties: {
            passport: {
                required: true,
                type: "object",
                properties: {
                    number: { required: true, type: "string" },
                    issuedDate: { required: true, type: "date" },
                    expiryDate: { required: true, type: "date" },
                    country: { required: true, type: "string" },
                },
            },
            driverLicense: {
                required: true,
                type: "object",
                properties: {
                    number: { required: true, type: "string" },
                    issuedDate: { required: true, type: "date" },
                    expiryDate: { required: true, type: "date" },
                    state: { required: true, type: "string" },
                },
            },
        },
    },
    purchaseHistory: {
        required: true,
        type: "array",
        properties: {
            purchaseId: { required: true, type: "string" },
            date: { required: true, type: "date" },
            amount: { required: true, type: "number", min: 0 },
            product: { required: true, type: "string" },
            status: { required: true, type: "string", enum: ["completed", "pending"] },
        },
    },
};


const testData = {
    name: "John Doe",
    age: 30,
    email: "john.doe@example.com",
    address: {
        street: "123 Main St",
        city: "Metropolis",
        postalCode: "12345",
        country: "USA",
        coordinates: {
            latitude: 40.7128,
            longitude: -74.0060,
        },
    },
    phoneNumbers: [
        { type: "mobile", number: "+1-202-555-0173" },
        { type: "home", number: "+1-202-555-0193" },
    ],
    roles: ["admin", "user", "editor"],
    preferences: {
        theme: "dark",
        notifications: {
            email: true,
            sms: false,
            push: true,
        },
        language: "en-US",
        currency: "USD",
    },
    orders: [
        {
            id: "order_001",
            items: [
                { productId: "p001", quantity: 2, price: 19.99 },
                { productId: "p002", quantity: 1, price: 49.99 },
            ],
            total: 89.97,
            status: "shipped",
            shipment: {
                trackingNumber: "1Z999AA10123456784",
                carrier: "UPS",
                estimatedDelivery: "2024-10-25",
                address: {
                    street: "123 Main St",
                    city: "Metropolis",
                    postalCode: "12345",
                    country: "USA",
                },
            },
        },
        {
            id: "order_002",
            items: [
                { productId: "p003", quantity: 5, price: 5.99 },
                { productId: "p004", quantity: 3, price: 29.99 },
            ],
            total: 149.92,
            status: "processing",
            shipment: null,
        },
    ],
    metadata: {
        createdAt: "2023-10-22T10:00:00Z",
        updatedAt: "2024-10-15T14:30:00Z",
        tags: ["new", "vip", "frequent-buyer"],
    },
    socialAccounts: [
        {
            platform: "twitter",
            username: "@johndoe",
            followers: 1500,
            verified: true,
        },
        {
            platform: "linkedin",
            username: "john-doe",
            connections: 500,
            verified: false,
        },
    ],
    documents: {
        passport: {
            number: "A12345678",
            issuedDate: "2018-05-20",
            expiryDate: "2028-05-20",
            country: "USA",
        },
        driverLicense: {
            number: "D12345678",
            issuedDate: "2016-11-15",
            expiryDate: "2026-11-15",
            state: "NY",
        },
    },
    purchaseHistory: Array.from({ length: 1000 }, (_, index) => ({
        purchaseId: `purchase_${index + 1}`,
        date: `2024-01-${(index % 30) + 1}`,
        amount: Math.random() * 100,
        product: `Product ${index + 1}`,
        status: index % 2 === 0 ? "completed" : "pending",
    })),
};