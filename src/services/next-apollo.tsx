import React from 'react';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/react-hooks';
import { init } from '@services/apollo';
import { ApolloClientType, User } from 'globals';
import { isBrowser } from '@utils/device';
import nextCookies from 'next-cookies';
import { gql } from 'apollo-boost';
import { redirect } from '@services/next';
import config from '@config/index';

export type WithApolloPropsType = {
    apolloClient: ApolloClientType;
    apolloState: {
        [key: string]: any;
    };
}

export function withApollo(PageComponent) {
    const WithApollo = ({ apolloState, apolloClient = init(apolloState), ...pageProps }: WithApolloPropsType) => (
        <ApolloProvider client={apolloClient}>
            <PageComponent {...pageProps} />
        </ApolloProvider>
    );

    WithApollo.getInitialProps = async (ctx) => {
        const { AppTree } = ctx;
        const { token } = nextCookies(ctx);
        ctx.apolloClient = init({}, { token });
        let pageProps = {};

        if (PageComponent.getInitialProps) {
            pageProps = await PageComponent.getInitialProps(ctx, ctx.apolloClient);
        }

        if (!isBrowser) {
            if (ctx.res && ctx.res.finished) {
                return pageProps;
            }

            try {
                const { getDataFromTree } = await import('@apollo/react-ssr');

                await getDataFromTree(
                    <AppTree
                        pageProps={{
                            ...pageProps,
                            apolloClient: ctx.apolloClient,
                        }}
                    />
                );
            } catch (error) {
                console.error('Error while running `getDataFromTree`', error);
            }

            Head.rewind();
        }

        const apolloState = ctx.apolloClient.cache.extract();

        return {
            ...pageProps,
            apolloState,
        };
    };

    return WithApollo;
}

type WithAuthPropsType = {
    [key: string]: any;
}

type WithAutPagePropsType = {
    myUser?: User;
}

export const CARDS_QUERY = gql`
    query {
        myUser {
            id
            name
            email
            emailApproved
            role {
                id
                name
            }
        }
    }
`;

// User together with withApollo decorator to achieve apolloClient in getInitialProps callback
export function withAuth(PageComponent) {
    const WithAuth = ({ ...pageProps }: WithAuthPropsType) => (
        <PageComponent {...pageProps} />
    );

    WithAuth.getInitialProps = async (ctx, apolloClient) => {
        let pageProps: WithAutPagePropsType = {};

        if (PageComponent.getInitialProps) {
            pageProps = await PageComponent.getInitialProps(ctx, ctx.apolloClient);
        }


        if (apolloClient) {
            const { data: { myUser } } = await apolloClient.query({ query: CARDS_QUERY });

            if (!myUser) {
                redirect({ ctx, where: config.app.redirectUrl });
            }

            // Here could a role specified logic.

            pageProps.myUser = myUser;
        }

        return { pageProps };
    };

    return WithAuth;
}
