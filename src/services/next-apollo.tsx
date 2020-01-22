import React from 'react';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/react-hooks';
import { init } from '@services/apollo';
import { ApolloClientType } from 'globals';
import { isBrowser } from '@utils/device';


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
        ctx.apolloClient = init();
        let pageProps = {};

        if (PageComponent.getInitialProps) {
            pageProps = await PageComponent.getInitialProps(ctx);
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

        console.log(apolloState);

        return {
            ...pageProps,
            apolloState,
        };
    };

    return WithApollo;
}
