import React from 'react';
import { ClassNameType, FieldsType, FieldType, ApolloClientType } from 'globals';
import * as classNames from 'classnames';
import FormFactory from '@components/form/Form';
import { translate } from '@i18n/index';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { FORGOT_PASSWORD_MUTATION } from '@graphql/user';
import useApolloErrors from '@hooks/useApolloErrors';

import './ForgotPasswordForm.scss';

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

export default function ForgotPasswordForm({ className }) {
    const [restorePassword, { loading, error }] = useMutation(FORGOT_PASSWORD_MUTATION);

    const submitProps = {
        caption: translate(!loading ? 'RESTORE_PASSWORD_SUBMIT' : 'LOADING...'),
        className: 'btn-gradient',
    };

    const onSubmit = ({ email: { value } }: onSubmitArgsType) => {
        restorePassword({ variables: { email: value } });
    };

    const [errors] = useApolloErrors(error);

    return (
        <div className={classNames('c-login-password-form', 'd-flex', 'flex-column', 'justify-content-around', className)}>
            <p className="c-forgot-password-form__description">{translate('RESTORE_PASSWORD_DESCRIPTION')}</p>
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
