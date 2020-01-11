import React from 'react';
import App from 'next/app';
import { NextComponentType, NextPageContext } from 'next/types';
import nextCookie from 'next-cookies';
import config from '@config/index';
import { initStores, applyStoresInitialState } from '@services/next-mobx';
import DefaultLayout from '@components/layouts/default/DefaultLayout';

import '@styles/argon-design-system.global.scss';

type OdaWebAppPropsType = NextComponentType & {initialState: any};

export type NextInitialPropsType = {
    Component: NextComponentType;
    ctx: NextPageContext;
}

export default class OdaWebApp extends App<OdaWebAppPropsType> {
    static async getInitialProps({ Component, ctx }: NextInitialPropsType): Promise<any> {
        let pageProps = {};

        const token = nextCookie(ctx)[config.app?.tokenName];

        const initialState = await initStores({ token });

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        let baseUrl = '';
        if (ctx.req) {
            baseUrl = `http://${ctx.req.headers.host}`;
        }

        return { pageProps, baseUrl, initialState };
    }

    componentDidMount(): void {
        // Setup client initial state
        applyStoresInitialState(this.props.initialState);
    }

    render() {
        const { Component, pageProps } = this.props;

        return (
            <>
                <DefaultLayout>
                    <Component {...pageProps} />
                </DefaultLayout>
            </>
        );
    }
}
