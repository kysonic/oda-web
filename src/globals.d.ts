import '@testing-library/jest-dom/extend-expect';

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
