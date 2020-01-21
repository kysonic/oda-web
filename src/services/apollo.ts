import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { isBrowser } from '@utils/device';
import fetch from 'isomorphic-unfetch';
import { ApolloClientType } from 'globals';

interface Options {
    getToken: () => string;
}

export function create(initialState: any = {}, options?: Options) {
    const httpLink = createHttpLink({
        uri: 'http://localhost:4000/',
        credentials: 'include',
        fetch,
    });

    const authLink = setContext((_, { headers }) => {
        const token = options?.getToken();

        return {
            headers: {
                ...headers,
                cookie: token ? `qid=${token}` : '',
            },
        };
    });

    return new ApolloClient({
        connectToDevTools: isBrowser,
        ssrMode: !isBrowser,
        link: authLink.concat(httpLink),
        cache: new InMemoryCache().restore(initialState),
    });
}

let apolloClient: ApolloClientType = null;

export function init(initialState?: any, options?: Options) {
    if (!isBrowser) {
        return create(initialState, options);
    }

    if (!apolloClient) {
        apolloClient = create(initialState, options);
    }

    return apolloClient;
}
