import Router from 'next/router';
import { isBrowser } from '@utils/device';
import { NextPageContext } from 'next';

export type RedirectOptionsType = {
    ctx?: NextPageContext;
    where: string;
}

export function redirect({ ctx, where }: RedirectOptionsType) {
    if (isBrowser) {
        Router.push(where);
    }

    return ctx?.res?.writeHead(302, { Location: where }).end();
}
