import React, { useEffect } from 'react';
import { ClassNameType, FieldsType, FieldType, ApolloClientType } from 'globals';
import * as classNames from 'classnames';
import FormFactory from '@components/form/Form';
import { translate } from '@i18n/index';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { LOGIN_MUTATION, SIGNUP_MUTATION } from '@graphql/user';
import useFrom from '@hooks/useForm';
import useApolloErrors from '@hooks/useApolloErrors';
import { redirect } from '@services/next';
import { emailFieldFactory, passwordFieldFactory, rememberMeFieldFactory } from '@services/form';
import { DateTime } from 'luxon';

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
        attrs: {
            autoComplete: 'off',
        },
    }),
    password: passwordFieldFactory({
        attrs: {
            autoComplete: 'off',
        },
    }),
};

export type LoginPasswordFormModeType = 'signIn' | 'signUp';

export type LoginPasswordFormPropsType = {
    mode?: LoginPasswordFormModeType;
} & ClassNameType;

export type onSubmitArgsType = {
    email: FieldType;
    password: FieldType;
}

export default function LoginPasswordForm({ className, mode = 'signIn' }: LoginPasswordFormPropsType) {
    const client: ApolloClientType<any> = useApolloClient();
    const isSingIn = () => mode === 'signIn';
    const formFields = isSingIn() ? LOGIN_FORM_FIELDS : SIGNUP_FORM_FIELDS;

    const [action, { loading, error }] = useMutation(isSingIn() ? LOGIN_MUTATION : SIGNUP_MUTATION, {
        onCompleted(response) {
            const token = response[isSingIn() ? 'login' : 'signup']?.token;
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            const rememberMe = isSingIn() && formData?.rememberMe?.value;
            const dt = DateTime.local().plus({ [rememberMe ? 'days' : 'hours']: 3 });
            document.cookie = `token=${token}; path=/; expires=${dt.toJSDate()}`;
            client.writeData({ data: { isLoggedIn: true } });
            redirect({ where: '/cards' });
        },
    });

    const [formData, onChange, handleSubmit, errors, setErrors] = useFrom(formFields, ({ email, password }: onSubmitArgsType) => {
        action({
            variables: {
                email: email.value,
                password: password.value,
            },
        });
    });

    const [apolloErrors] = useApolloErrors(error);

    useEffect(() => {
        setErrors(apolloErrors);
    }, [apolloErrors]);

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

    return (
        <div className={classNames('c-login-password-form', className)}>
            <FormFactory
                className="c-login-password-form__form"
                formData={formData}
                onChange={onChange}
                handleSubmit={handleSubmit}
                errors={errors}
                fields={formFields}
                submitProps={submitProps}
            />
        </div>
    );
}
