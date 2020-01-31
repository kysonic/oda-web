import React from 'react';
import { ClassNameType, FieldsType, FieldType } from 'globals';
import * as classNames from 'classnames';
import FormFactory from '@components/form/Form';
import { translate } from '@i18n/index';
import { useMutation } from '@apollo/react-hooks';
import { SIGNUP_MUTATION } from '@graphql/user';
import { redirect } from '@services/next';
import { emailFieldFactory, passwordFieldFactory } from '@services/form';
import { DateTime } from 'luxon';
import useApolloErrors from '@hooks/useApolloErrors';

import './SignUpForm.scss';


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

export type SignInFormPropsType = {} & ClassNameType;

export type onSubmitArgsType = {
    email: FieldType;
    password: FieldType;
    rememberMe: FieldType;
}

export default function SignInForm({ className }: SignInFormPropsType) {
    const [action, { loading, error }] = useMutation(SIGNUP_MUTATION, {
        onCompleted({ signup }) {
            const token = signup?.token;
            const dt = DateTime.local().plus({ hours: 3 });
            document.cookie = `token=${token}; path=/; expires=${dt.toJSDate()}`;
            redirect({ where: '/' });
        },
    });

    const onSubmit = ({ email, password }: onSubmitArgsType) => {
        action({
            variables: {
                email: email.value,
                password: password.value,
            },
        });
    };

    const { errors } = useApolloErrors(error);

    return (
        <div className={classNames('c-sign-up-form', className)}>
            <FormFactory
                className="c-sign-up-form__form"
                fields={SIGNUP_FORM_FIELDS}
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
