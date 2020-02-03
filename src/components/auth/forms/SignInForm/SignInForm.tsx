import React, { useState } from 'react';
import { ClassNameType, FieldsType, FieldType } from 'globals';
import * as classNames from 'classnames';
import FormFactory from '@components/form/Form';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN_MUTATION } from '@graphql/user';
import { emailFieldFactory, passwordFieldFactory, rememberMeFieldFactory } from '@services/form';
import { DateTime } from 'luxon';
import useApolloErrors from '@hooks/useApolloErrors';
import useFormButton from '@hooks/useFormButton';
import { redirect } from '@services/next';

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
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            setDone(true);
        },
    });

    const onDone = () => {
        console.log('DOne');
        redirect({ where: '/' });
    };
    const { setDone, submitButtonProps } = useFormButton('SIGN_IN', loading, onDone);

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
                submitButtonProps={submitButtonProps}
                onSubmit={onSubmit}
                extraErrors={errors}
            />
        </div>
    );
}
