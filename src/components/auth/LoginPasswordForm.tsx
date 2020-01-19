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
    },
    password: {
        type: 'text',
        name: 'password',
        fieldType: 'password',
        placeholder: 'PASSWORD',
        validation: 'password',
        required: true,
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
    return (
        <div className={classNames('c-login-password-form', className)}>
            <FormFactory
                className="c-login-password-form__form"
                fields={LOGIN_PASSWORD_FORM_FIELDS}
                submitText={translate('SIGN_IN')}
                onSubmit={(values) => console.log('SBMT', values)}
            />
        </div>
    );
}
