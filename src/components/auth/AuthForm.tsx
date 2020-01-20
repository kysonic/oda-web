import React from 'react';
import * as classNames from 'classnames';
import { ClassNameType } from 'globals';
import { translate } from '@i18n/index';
import LoginPasswordForm from '@components/auth/LoginPasswordForm';

import './AuthForm.scss';

export type AuthFormPropsType = {} & ClassNameType;

export default function AuthForm({ className }: AuthFormPropsType) {
    return (
        <div className={classNames('c-auth-form d-flex flex-column align-items-center justify-content-between', className)}>
            <h1 className="c-auth-form__title font-weight-bold text-center">{translate('AUTHORIZATION')}</h1>
            <LoginPasswordForm className="c-auth-form__form" />
            <a href="#" className="c-auth-form__forgot-password">{translate('FORGOT_PASSWORD')}</a>
        </div>
    );
}
