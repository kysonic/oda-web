import React, { useEffect } from 'react';
import * as classNames from 'classnames';
import FormFactory from '@components/form/Form';
import { FieldsType, ClassNameType } from 'globals';
import { useMutation } from '@apollo/react-hooks';
import { CHANGE_PASSWORD_MUTATION } from '@graphql/user';
import useApolloErrors from '@hooks/useApolloErrors';
import { translate } from '@i18n/index';
import useFrom from '@hooks/useForm';
import { useRouter } from 'next/router';
import { redirect } from '@services/next';

import './ChangePasswordForm.scss';

const CHANGE_PASSWORD_FORM_FIELDS: FieldsType = {
    password: {
        type: 'text',
        name: 'password',
        fieldType: 'password',
        placeholder: 'ENTER_NEW_PASSWORD',
        validation: 'password',
        required: true,
        className: 'input-group--rounded',
    },
    confirmPassword: {
        type: 'text',
        name: 'confirmPassword',
        fieldType: 'password',
        placeholder: 'CONFIRM_NEW_PASSWORD',
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

function ChangePasswordForm({ className }: ChangePasswordFormPropsType) {
    const router = useRouter();
    const { token } = router.query;

    if (!token) {
        redirect({ where: '/login' });
    }

    const [changePassword, { loading, error }] = useMutation(CHANGE_PASSWORD_MUTATION, {
        onCompleted(response) {
            const { changeUserPassword: { success } } = response;

            if (success) {
                redirect({ where: '/login' });
            }
        },
    });

    const onSubmit = ({ password }) => {
        changePassword({
            variables: {
                token,
                password: password.value,
            },
        });
    };

    const [formData, onChange, handleSubmit, errors, setErrors] = useFrom(CHANGE_PASSWORD_FORM_FIELDS, onSubmit);

    const [apolloErrors] = useApolloErrors(error);

    useEffect(() => {
        setErrors(apolloErrors);
    }, [apolloErrors]);

    const submitProps = {
        caption: translate(!loading ? 'CHANGE_PASSWORD' : 'LOADING...'),
        className: 'btn-gradient',
    };

    return (
        <div className={classNames('c-change-password-form', 'd-flex', 'flex-column', 'justify-content-around', className)}>
            <FormFactory
                className="c-change-password-form__form"
                formData={formData}
                onChange={onChange}
                handleSubmit={handleSubmit}
                errors={errors}
                fields={CHANGE_PASSWORD_FORM_FIELDS}
                submitProps={submitProps}
            />
        </div>
    );
}

export default ChangePasswordForm;
