import React from 'react';
import App from 'next/app';
import { NextComponentType, NextPageContext } from 'next/types';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '@themes/default';
import { toJS } from 'mobx';
import { AppStore } from '@stores/app';
import nextCookie from 'next-cookies';
import config from '@config/index';

type OdaWebAppPropsType = NextComponentType & {initialState: any};

export type NextInitialPropsType = {
    Component: NextComponentType;
    ctx: NextPageContext;
}

export default class OdaWebApp extends App<OdaWebAppPropsType> {
    static async getInitialProps({ Component, ctx }: NextInitialPropsType): Promise<any> {
        let pageProps = {};
        const appStore = AppStore();

        const token = nextCookie(ctx)[config.app?.tokenName];

        if (typeof appStore.fetch === 'function') {
            await appStore.fetch(token);
        }

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        let baseUrl = '';
        if (ctx.req) {
            baseUrl = `http://${ctx.req.headers.host}`;
        }

        const initialState = toJS(appStore);

        return { pageProps, initialState, baseUrl };
    }

    componentDidMount(): void {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        jssStyles?.parentElement?.removeChild(jssStyles);
    }

    render() {
        const { Component, pageProps, } = this.props;

        return (
            <>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Component {...pageProps} />
                </ThemeProvider>
            </>
        );
    }
}
