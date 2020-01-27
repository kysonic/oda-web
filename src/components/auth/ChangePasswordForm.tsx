import React from 'react';
import * as classNames from 'classnames';
import FormFactory from '@components/form/Form';
import { FieldsType, ApolloClientType, ClassNameType } from 'globals';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { CHANGE_PASSWORD_MUTATION } from '@graphql/user';
import useApolloErrors from '@hooks/useApolloErrors';
import { translate } from '@i18n/index';


const CHANGE_PASSWORD_FORM_FIELDS: FieldsType = {
    password: {
        type: 'text',
        name: 'password',
        fieldType: 'password',
        placeholder: 'ENTER_YOUR_PASSWORD',
        validation: 'password',
        required: true,
        className: 'input-group--rounded',
    },
    confirmPassword: {
        type: 'text',
        name: 'confirmPassword',
        fieldType: 'password',
        placeholder: 'CONFIRM_YOUR_PASSWORD',
        validation: 'confirmPassword',
        required: true,
        className: 'input-group--rounded',
    },
};

type ChangePasswordFormPropsType = {} & ClassNameType;

export type onSubmitArgsType = {
    token: string;
    password: string;
}

export default function ChangePasswordForm({ className }: ChangePasswordFormPropsType) {
    const client: ApolloClientType<any> = useApolloClient();
    const [changePassword, { loading, error }] = useMutation(CHANGE_PASSWORD_MUTATION);

    const [errors] = useApolloErrors(error);

    const onSubmit = ({ token, password }) => {
        console.log('Submit', token, password);
        changePassword({
            variables: {
                token: token.value,
                password: password.value,
            },
        });
    };

    const submitProps = {
        caption: translate(!loading ? 'CHANGE_PASSWORD' : 'LOADING...'),
        className: 'btn-gradient',
    };

    return (
        <div className={classNames('c-login-password-form', 'd-flex', 'flex-column', 'justify-content-around', className)}>
            <FormFactory
                className="c-login-password-form__form"
                fields={CHANGE_PASSWORD_FORM_FIELDS}
                submitProps={submitProps}
                onSubmit={onSubmit}
                externalErrors={errors}
            />
        </div>
    );
}
