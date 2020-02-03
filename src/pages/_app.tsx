import '@styles/oda-design-system.global.scss';

import React from 'react';
import App from 'next/app';
import { NextComponentType, NextPageContext } from 'next/types';
import Router from 'next/router';

type OdaWebAppPropsType = NextComponentType & {initialState: any};

export type NextInitialPropsType = {
    Component: NextComponentType;
    ctx: NextPageContext;
}

export default class OdaWebApp extends App<OdaWebAppPropsType> {
    static async getInitialProps({ Component, ctx }: NextInitialPropsType): Promise<any> {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        let baseUrl = '';

        if (ctx.req) {
            baseUrl = `http://${ctx.req.headers.host}`;
        }

        return { pageProps, baseUrl };
    }

    componentDidMount(): void {
        // TODO: Remove this shitty workaround once https://github.com/zeit/next-plugins/issues/282 is solved
        if (process.env.NODE_ENV !== 'production') {
            Router.events.on('routeChangeComplete', () => {
                const linkNode: HTMLAnchorElement | null = document.querySelector('link[href*="/_next/static/css/styles.chunk.css"]');

                if (linkNode) {
                    const timestamp = new Date().valueOf();
                    linkNode.rel = 'stylesheet';
                    linkNode.href = `/_next/static/css/styles.chunk.css?v=${timestamp}`;
                }
            });
        }
    }

    render() {
        const { Component, pageProps } = this.props;

        return (
            <>
                <Component {...pageProps} />
            </>
        );
    }
}
