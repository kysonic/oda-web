import React from 'react';
import * as classNames from 'classnames';
import { ClassNameType } from 'globals';
import { translate } from '@i18n/index';
import ChangePasswordForm from '@components/auth/ChangePasswordForm';

import './AuthForm.scss';

export type AuthFormPropsType = {} & ClassNameType;

export default function ChangePasswordCard() {
    return (
        <div className={classNames('c-auth-form d-flex flex-column align-items-center justify-content-between')}>
            <h1 className="c-auth-form__title font-weight-bold text-center">{translate('CHANGE_PASSWORD')}</h1>
            <ChangePasswordForm className="c-login-password-form" />
        </div>
    );
}
