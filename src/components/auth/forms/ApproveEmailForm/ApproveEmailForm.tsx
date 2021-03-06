import React from 'react';
import * as classNames from 'classnames';
import FormFactory from '@components/form/Form';
import { translate } from '@i18n/index';
import { useMutation } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import { APPROVE_EMAIL_MUTATION } from '@graphql/user';
import useApolloErrors from '@hooks/useApolloErrors';
import useFormButton from '@hooks/useFormButton';
import { ClassNameType } from 'globals';
import { redirect } from '@services/next';

import './ApproveEmailFrom.scss';

export type ApproveEmailFormPropsType = {} & ClassNameType;

export default function ApproveEmailForm({ className }: ApproveEmailFormPropsType) {
    const router = useRouter();
    const { token } = router.query;

    if (!token) {
        redirect({ where: '/login' });
    }

    const [approveEmail, { loading, error }] = useMutation(APPROVE_EMAIL_MUTATION, {
        onCompleted({ approveUserEmail: { success } }) {
            if (success) {
                // eslint-disable-next-line @typescript-eslint/no-use-before-define
                setDone(true);
            }
        },
    });

    const onDone = () => redirect({ where: '/' });
    const { setDone, submitButtonProps } = useFormButton('SEND', loading, onDone);

    const onSubmit = () => {
        approveEmail({ variables: { token } });
    };

    const { errors } = useApolloErrors(error);

    return (
        <div className={classNames('c-approve-email-form d-flex flex-column justify-content-around', className)}>
            <p className="c-approve-email-form__description">{translate('APPROVE_EMAIL_DESCRIPTION')}</p>
            <FormFactory
                className="c-approve-email-form__form"
                fields={[]}
                submitButtonProps={submitButtonProps}
                onSubmit={onSubmit}
                extraErrors={errors}
            />
        </div>
    );
}
