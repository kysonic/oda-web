import React from 'react';
import { ClassNameType, FieldsType, FieldType } from 'globals';
import * as classNames from 'classnames';
import FormFactory from '@components/form/Form';
import { useMutation } from '@apollo/react-hooks';
import { SIGNUP_MUTATION } from '@graphql/user';
import { redirect } from '@services/next';
import { emailFieldFactory, passwordFieldFactory } from '@services/form';
import { DateTime } from 'luxon';
import useApolloErrors from '@hooks/useApolloErrors';
import useFormButton from '@hooks/useFormButton';

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
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            setDone(true);
        },
    });

    const onDone = () => redirect({ where: '/' });
    const { setDone, submitButtonProps } = useFormButton('SIGN_UP', loading, onDone);

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
                submitButtonProps={submitButtonProps}
                onSubmit={onSubmit}
                extraErrors={errors}
            />
        </div>
    );
}
