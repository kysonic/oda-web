import React from 'react';
import * as classNames from 'classnames';
import { ClassNameType } from 'globals';
import { translate } from '@i18n/index';
import Link from 'next/link';

import './AuthCard.scss';

export type ControlType = {
    link: string;
    caption: string;
};

export type AuthFormPropsType = {
    title: string;
    controls: Array<ControlType>;
    controlsClassName?: string;
    children: React.ReactNode;
} & ClassNameType;

export default function AuthCard({ className, title, children, controls, controlsClassName }: AuthFormPropsType) {
    return (
        <div className={classNames('c-auth-card d-flex flex-column align-items-center justify-content-between', className)}>
            <h1 className="c-auth-card__title font-weight-bold text-center">{translate(title)}</h1>
            {children}
            <div
                className={classNames('c-auth-card__controls', controlsClassName)}
            >
                {controls.map(({ link, caption }: ControlType) => (
                    <Link key={caption} href={link}>
                        <a className="c-auth-card__control-link">{translate(caption)}</a>
                    </Link>
                ))}
            </div>
        </div>
    );
}
