import React from 'react';
import { ClassNameType, FieldsType, FieldType, ApolloClientType } from 'globals';
import * as classNames from 'classnames';
import FormFactory from '@components/form/Form';
import { translate } from '@i18n/index';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { LOGIN_MUTATION } from '@graphql/user';
import useApolloErrors from '@hooks/useApolloErrors';
import { redirect } from '@services/next';
import { onSubmitArgsType } from '@components/auth/LoginPasswordForm';

export type onSubmitArgsType = {
    email: FieldType;
};

const RESTORE_PASSWORD_FORM_FIELDS: FieldsType = {
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
};

export default function RestorePasswordEmailForm() {
    const client: ApolloClientType<any> = useApolloClient();

    const [restorePassword, { loading, error }] = useMutation(LOGIN_MUTATION, {
        onCompleted({ login: { token } }) {
            document.cookie = `token=${token}; path=/`;
            client.writeData({ data: { isLoggedIn: true } });
            redirect({ where: '/cards' });
            // TODO: Cache user query
        },
    });

    const submitProps = {
        caption: translate(!loading ? 'SIGN_IN' : 'LOADING...'),
        className: 'btn-gradient',
    };

    const onSubmit = ({ email }: onSubmitArgsType) => {
        restorePassword(email);
    };

    const [errors] = useApolloErrors(error);

    return (
        <div className={classNames('c-login-password-form')}>
            <FormFactory
                className="c-login-password-form__form"
                fields={RESTORE_PASSWORD_FORM_FIELDS}
                submitProps={submitProps}
                onSubmit={onSubmit}
                externalErrors={errors}
            />
        </div>
    );
}
