import axios from 'axios';
import config from '@config/index';
import { GraphQLResponse } from '../types/globals';

export type GraphQlServiceHeadersType = {
    Accept?: string;
    'Content-Type'?: string;
    Authorization?: string;
}

const DEFAULT_HEADERS = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

export async function commitOperation(query: string, variables?: Record<string, any> | null, token?: string): Promise<GraphQLResponse> {
    const headers: GraphQlServiceHeadersType = {};

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await axios.post(config.app.baseUrl, { query, variables }, {
        headers: Object.assign(DEFAULT_HEADERS, headers),
    });

    return response.data;
}

export async function commitQuery(query: string, token?: string): Promise<GraphQLResponse> {
    return commitOperation(query, null, token);
}

export async function commitMutation(query: string, variables: Record<string, any>, token?: string): Promise<GraphQLResponse> {
    return commitOperation(query, variables, token);
}
