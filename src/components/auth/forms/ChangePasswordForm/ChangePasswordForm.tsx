import React from 'react';
import * as classNames from 'classnames';
import FormFactory from '@components/form/Form';
import { FieldsType, ClassNameType } from 'globals';
import { useMutation } from '@apollo/react-hooks';
import { CHANGE_PASSWORD_MUTATION } from '@graphql/user';
import useApolloErrors from '@hooks/useApolloErrors';
import useFormButton from '@hooks/useFormButton';
import { useRouter } from 'next/router';
import { redirect } from '@services/next';
import { passwordFieldFactory } from '@services/form';

import './ChangePasswordForm.scss';

const CHANGE_PASSWORD_FORM_FIELDS: FieldsType = {
    password: passwordFieldFactory({
        placeholder: 'ENTER_NEW_PASSWORD',
        name: 'password',
    }),
    confirmPassword: passwordFieldFactory({
        placeholder: 'CONFIRM_NEW_PASSWORD',
        validation: 'confirmPassword',
        name: 'confirmPassword',
    }),
};

type ChangePasswordFormPropsType = {} & ClassNameType;

function ChangePasswordForm({ className }: ChangePasswordFormPropsType) {
    const router = useRouter();
    const { token } = router.query;

    if (!token) {
        redirect({ where: '/login' });
    }

    const [changePassword, { loading, error }] = useMutation(CHANGE_PASSWORD_MUTATION, {
        onCompleted({ changeUserPassword: { success } }) {
            if (success) {
                // eslint-disable-next-line @typescript-eslint/no-use-before-define
                setDone(true);
            }
        },
    });

    const onDone = () => redirect({ where: '/login' });
    const { setDone, submitButtonProps } = useFormButton('CHANGE_PASSWORD', loading, onDone);

    const onSubmit = ({ password }) => {
        changePassword({
            variables: {
                token,
                password: password.value,
            },
        });
    };

    const { errors } = useApolloErrors(error);

    return (
        <div className={classNames('c-change-password-form', 'd-flex', 'flex-column', 'justify-content-around', className)}>
            <FormFactory
                className="c-change-password-form__form"
                fields={CHANGE_PASSWORD_FORM_FIELDS}
                extraErrors={errors}
                submitButtonProps={submitButtonProps}
                onSubmit={onSubmit}
            />
        </div>
    );
}

export default ChangePasswordForm;
