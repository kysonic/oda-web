import React from 'react';
import * as classNames from 'classnames';
import { ClassNameType } from 'globals';
import { translate } from '@i18n/index';
import LoginPasswordForm, { LoginPasswordFormModeType } from '@components/auth/LoginPasswordForm';
import Link from 'next/link';

import './AuthCard.scss';

export type ControlType = {
    link: string;
    caption: string;
};

export type AuthFormPropsType = {
    title: string;
    mode: LoginPasswordFormModeType;
    controls: Array<ControlType>;
} & ClassNameType;

export default function AuthCard({ className, title, mode, controls }: AuthFormPropsType) {
    return (
        <div className={classNames('c-auth-card d-flex flex-column align-items-center justify-content-between', className)}>
            <h1 className="c-auth-card__title font-weight-bold text-center">{translate(title)}</h1>
            <LoginPasswordForm mode={mode} className="c-auth-card__form" />
            <div className="c-auth-card__controls d-flex justify-content-between align-items-center flex-column flex-sm-row">
                {controls.map(({ link, caption }: ControlType) => (
                    <Link key={caption} href={link}>
                        <a className="c-auth-card__control-link">{translate(caption)}</a>
                    </Link>
                ))}
            </div>
        </div>
    );
}
