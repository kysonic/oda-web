import React, { useEffect } from 'react';
import { FieldsType, FieldType } from 'globals';
import * as classNames from 'classnames';
import FormFactory from '@components/form/Form';
import { translate } from '@i18n/index';
import { useMutation } from '@apollo/react-hooks';
import { FORGOT_PASSWORD_MUTATION } from '@graphql/user';
import useApolloErrors from '@hooks/useApolloErrors';
import { emailFieldFactory } from '@services/form';
import useFrom from '@hooks/useForm';

import './FormCommon.scss';

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
    };

    const [formData, onChange, handleSubmit, errors, setErrors] = useFrom(RESTORE_PASSWORD_FORM_FIELDS, onSubmit);

    const submitProps = {
        caption: translate(!loading ? 'RESTORE_PASSWORD_SUBMIT' : 'LOADING...'),
        className: 'btn-gradient',
    };

    const [apolloErrors] = useApolloErrors(error);

    useEffect(() => {
        setErrors(apolloErrors);
    }, [apolloErrors]);

    return (
        <div className={classNames('c-auth-form d-flex flex-column justify-content-around', className)}>
            <p className="c-auth-form__description">{translate('RESTORE_PASSWORD_DESCRIPTION')}</p>
            <FormFactory
                className="c-auth-form__form"
                formData={formData}
                onChange={onChange}
                handleSubmit={handleSubmit}
                errors={errors}
                fields={RESTORE_PASSWORD_FORM_FIELDS}
                submitProps={submitProps}
            />
        </div>
    );
}
