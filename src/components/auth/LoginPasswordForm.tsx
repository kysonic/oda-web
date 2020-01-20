import React from 'react';
import { ClassNameType, FieldsType } from 'globals';
import * as classNames from 'classnames';
import FormFactory from '@components/form/Form';
import { translate } from '@i18n/index';

import './LoginPasswordForm.scss';

const LOGIN_PASSWORD_FORM_FIELDS: FieldsType = {
    email: {
        type: 'text',
        name: 'email',
        fieldType: 'email',
        placeholder: 'EMAIL',
        validation: 'email',
        required: true,
        className: 'input-group--rounded',
        icon: 'ui-outline-1_email-83',
    },
    password: {
        type: 'text',
        name: 'password',
        fieldType: 'password',
        placeholder: 'PASSWORD',
        validation: 'password',
        required: true,
        className: 'input-group--rounded',
        icon: 'ui-outline-1_lock-circle',
    },
    rememberMe: {
        type: 'checkbox',
        name: 'rememberMe',
        label: 'REMEMBER_ME',
        required: false,
    },
};

export type LoginPasswordFormPropsType = {} & ClassNameType;

export default function LoginPasswordForm({ className }: LoginPasswordFormPropsType) {
    const submitProps = { caption: translate('SIGN_IN'), className: 'btn-gradient' };

    return (
        <div className={classNames('c-login-password-form', className)}>
            <FormFactory
                className="c-login-password-form__form"
                fields={LOGIN_PASSWORD_FORM_FIELDS}
                submitProps={submitProps}
                onSubmit={(values) => console.log('SBMT', values)}
            />
        </div>
    );
}
