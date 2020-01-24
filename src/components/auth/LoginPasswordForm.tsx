import React from 'react';
import { ClassNameType, FieldsType, FieldType, ApolloClientType } from 'globals';
import * as classNames from 'classnames';
import FormFactory from '@components/form/Form';
import { translate } from '@i18n/index';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { LOGIN_MUTATION, SIGNUP_MUTATION } from '@graphql/user';
import useApolloErrors from '@hooks/useApolloErrors';
import { redirect } from '@services/next';
import { emailFieldFactory, passwordFieldFactory, rememberMeFieldFactory } from '@services/form';

import './LoginPasswordForm.scss';

const LOGIN_FORM_FIELDS: FieldsType = {
    email: emailFieldFactory({
        attrs: {
            autoComplete: 'username',
        },
    }),
    password: passwordFieldFactory({
        attrs: {
            autoComplete: 'current-password',
        },
    }),
    rememberMe: rememberMeFieldFactory(),
};

const SIGNUP_FORM_FIELDS: FieldsType = {
    email: emailFieldFactory({
        value: '',
        attrs: {
            autoComplete: 'off',
        },
    }),
    password: passwordFieldFactory({
        value: '',
        attrs: {
            autoComplete: 'off',
        },
    }),
};

export type LoginPasswordFormPropsType = {
    mode?: 'signIn' | 'signUp';
} & ClassNameType;

export type onSubmitArgsType = {
    email: FieldType;
    password: FieldType;
}

export default function LoginPasswordForm({ className, mode = 'signIn' }: LoginPasswordFormPropsType) {
    const client: ApolloClientType<any> = useApolloClient();
    const isSingIn = () => mode === 'signIn';

    const [login, { loading, error }] = useMutation(isSingIn() ? LOGIN_MUTATION : SIGNUP_MUTATION, {
        onCompleted({ login: { token } }) {
            document.cookie = `token=${token}; path=/`;
            client.writeData({ data: { isLoggedIn: true } });
            redirect({ where: '/cards' });
            // TODO: Cache user query
        },
    });

    const [errors] = useApolloErrors(error);

    const getSubmitCaption = () => {
        if (loading) {
            return 'LOADING...';
        }

        return isSingIn() ? 'SIGN_IN' : 'SIGN_UP';
    };

    const submitProps = {
        caption: translate(getSubmitCaption()),
        className: classNames('btn-gradient', { 'mt-4': !isSingIn() }),
    };

    const onSubmit = ({ email, password }: onSubmitArgsType) => {
        login({
            variables: {
                email: email.value,
                password: password.value,
            },
        });
    };

    return (
        <div className={classNames('c-login-password-form', className)}>
            <FormFactory
                className="c-login-password-form__form"
                fields={isSingIn() ? LOGIN_FORM_FIELDS : SIGNUP_FORM_FIELDS}
                submitProps={submitProps}
                onSubmit={onSubmit}
                externalErrors={errors}
            />
        </div>
    );
}
