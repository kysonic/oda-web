import '@testing-library/jest-dom/extend-expect';

export * from './schema';

// REACT

export type ClassNameType = {
    className?: string;
}

export type useCallbackType = (event: any) => void;

// GRAPHQL

export type GraphQlErrorLocation = {
    line: number;
    column: number;
}

export type GraphQlError = {
    message: string;
    locations: Array<GraphQlErrorLocation>;
}

export type GraphQLResponse = {
    data?: Record<string, any>;
    error?: {
        errors: Array<GraphQlError>;
    };
}

// MOBX

export type FetchPayload = {
    token?: string;
}

// FORM

export type FieldType = {
    type: string;
    name: string;
    value?: string | number;
    fieldType?: string; // input type={fieldType}
    label?: string;
    placeholder?: string;
    validation?: string;
    required?: boolean;
}
