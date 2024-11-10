interface ValidationRules {
    required?: boolean;
    type?: "string" | "number" | "boolean" | "array" | "object" | "date" | "enum" | `array:${string}`;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    pattern?: RegExp;
    enum?: any[];
    properties?: Schema;
}

export interface Schema {
    [key: string]: ValidationRules;
}