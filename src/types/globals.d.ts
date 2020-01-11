import '@testing-library/jest-dom/extend-expect';

export * from './schema';

// REACT

export type ClassNameType = {
    className?: string;
}

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
