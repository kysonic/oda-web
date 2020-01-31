import React, { useState } from 'react';
import { ClassNameType, FieldsType, FieldType } from 'globals';
import * as classNames from 'classnames';
import FormFactory from '@components/form/Form';
import { translate } from '@i18n/index';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN_MUTATION } from '@graphql/user';
import { redirect } from '@services/next';
import { emailFieldFactory, passwordFieldFactory, rememberMeFieldFactory } from '@services/form';
import { DateTime } from 'luxon';
import useApolloErrors from '@hooks/useApolloErrors';

import './SignInForm.scss';


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


export type SignInFormPropsType = {} & ClassNameType;

export type onSubmitArgsType = {
    email: FieldType;
    password: FieldType;
    rememberMe: FieldType;
}

export default function SignInForm({ className }: SignInFormPropsType) {
    const [rememberMe, setRememberMe] = useState(false);

    const [action, { loading, error }] = useMutation(LOGIN_MUTATION, {
        onCompleted({ login }) {
            const token = login?.token;
            const dt = DateTime.local().plus({ [rememberMe ? 'days' : 'hours']: 3 });
            document.cookie = `token=${token}; path=/; expires=${dt.toJSDate()}`;
            redirect({ where: '/' });
        },
    });

    const onSubmit = ({ email, password, rememberMe: { value } }: onSubmitArgsType) => {
        setRememberMe(value);

        action({
            variables: {
                email: email.value,
                password: password.value,
            },
        });
    };

    const { errors } = useApolloErrors(error);

    return (
        <div className={classNames('c-sign-in-form', className)}>
            <FormFactory
                className="c-sign-in-form__form"
                fields={LOGIN_FORM_FIELDS}
                submitButtonProps={{
                    caption: translate(loading ? 'LOADING...' : 'SIGN_IN'),
                    className: 'btn-gradient',
                }}
                onSubmit={onSubmit}
                extraErrors={errors}
            />
        </div>
    );
}
