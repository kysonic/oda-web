import React, { useEffect } from 'react';
import { ClassNameType, FieldsType, FieldType } from 'globals';
import * as classNames from 'classnames';
import FormFactory from '@components/form/Form';
import { translate } from '@i18n/index';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN_MUTATION } from '@graphql/user';

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
        attrs: {
            autoComplete: 'username',
        },
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
        attrs: {
            autoComplete: 'current-password',
        },
    },
    rememberMe: {
        type: 'checkbox',
        name: 'rememberMe',
        label: 'REMEMBER_ME',
        required: false,
    },
};

export type LoginPasswordFormPropsType = {} & ClassNameType;

export type onSubmitArgsType = {
    email: FieldType;
    password: FieldType;
}

export default function LoginPasswordForm({ className }: LoginPasswordFormPropsType) {
    const [login, { loading, error, data }] = useMutation(LOGIN_MUTATION);

    const submitProps = {
        caption: translate(!loading ? 'SIGN_IN' : 'LOADING...'),
        className: 'btn-gradient',
    };

    const onSubmit = ({ email, password }: onSubmitArgsType) => {
        login({
            variables: {
                email: email.value,
                password: password.value,
            },
        });
    };

    useEffect(() => {
        console.log(data);
    }, [data]);

    useEffect(() => {
        console.log(error?.message);
    }, [error]);

    return (
        <div className={classNames('c-login-password-form', className)}>
            <FormFactory
                className="c-login-password-form__form"
                fields={LOGIN_PASSWORD_FORM_FIELDS}
                submitProps={submitProps}
                onSubmit={onSubmit}
            />
        </div>
    );
}
