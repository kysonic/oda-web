import React from 'react';
import * as classNames from 'classnames';
import Link from 'next/link';
import { ClassNameType } from 'globals';
import { translate } from '@i18n/index';
import ForgotPasswordForm from '@components/auth/ForgotPasswordForm';

import './AuthForm.scss';

export type AuthFormPropsType = {} & ClassNameType;

export default function ForgotPasswordCard({ className }: AuthFormPropsType) {
    return (
        <div className={classNames('c-auth-form d-flex flex-column align-items-center justify-content-between', className)}>
            <h1 className="c-auth-form__title font-weight-bold text-center">{translate('RESTORE_PASSWORD')}</h1>
            <ForgotPasswordForm className="c-auth-form__forgot-password" />
            <Link href="/login">
                <a className="c-auth-form__forgot-password">{translate('AUTHORIZATION')}</a>
            </Link>
        </div>
    );
}
