import React from 'react';
import { FieldsType, FieldType } from 'globals';
import * as classNames from 'classnames';
import FormFactory from '@components/form/Form';
import { translate } from '@i18n/index';
import { useMutation } from '@apollo/react-hooks';
import { FORGOT_PASSWORD_MUTATION } from '@graphql/user';
import useApolloErrors from '@hooks/useApolloErrors';
import { emailFieldFactory } from '@services/form';
import { redirect } from '@services/next';
import useFormButton from '@hooks/useFormButton';

import './ForgotPasswordForm.scss';

export type onSubmitArgsType = {
    email: FieldType;
};

const RESTORE_PASSWORD_FORM_FIELDS: FieldsType = {
    email: emailFieldFactory({
        attrs: {
            autoComplete: 'username',
        },
    }),
};

export default function ForgotPasswordForm({ className }) {
    const [restorePassword, { loading, error }] = useMutation(FORGOT_PASSWORD_MUTATION);

    const onSubmit = ({ email: { value } }: onSubmitArgsType) => {
        restorePassword({ variables: { email: value } });
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        setDone(true);
    };

    const onDone = () => redirect({ where: '/login' });
    const { setDone, submitButtonProps } = useFormButton('RESTORE_PASSWORD_SUBMIT', loading, onDone);

    const { errors } = useApolloErrors(error);

    return (
        <div className={classNames('c-forgot-password-form d-flex flex-column justify-content-around', className)}>
            <p className="c-forgot-password-form__description">{translate('RESTORE_PASSWORD_DESCRIPTION')}</p>
            <FormFactory
                className="c-forgot-password-form__form"
                fields={RESTORE_PASSWORD_FORM_FIELDS}
                submitButtonProps={submitButtonProps}
                onSubmit={onSubmit}
                extraErrors={errors}
            />
        </div>
    );
}
