import config from '@config/index';
import { GraphQLResponse } from '../globals';

export type GraphQlServiceHeadersType = {
    Accept?: string;
    'Content-Type'?: string;
    Authorization?: string;
}

const DEFAULT_HEADERS = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

export async function commitOperation(query: string, variables?: Record<string, any>): Promise<GraphQLResponse> {
    const headers: GraphQlServiceHeadersType = {};

    if (localStorage.get(config.app?.localStorage?.tokenName)) {
        headers.Authorization = `Bearer ${localStorage.get(config.app?.localStorage?.tokenName)}`;
    }

    const response = await fetch(config.app.baseUrl, {
        method: 'POST',
        headers: Object.assign(DEFAULT_HEADERS, headers),
        body: JSON.stringify({ query, variables }),
    });

    return response.json();
}

export async function commitQuery(query: string): Promise<GraphQLResponse> {
    return commitOperation(query);
}

export async function commitMutation(query: string, variables: Record<string, any>): Promise<GraphQLResponse> {
    return commitOperation(query, variables);
}
