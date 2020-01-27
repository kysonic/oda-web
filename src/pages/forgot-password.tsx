import React from 'react';
import AuthLayout from '@components/layouts/auth/AuthLayout';
import { withApollo } from '@services/next-apollo';
import AuthCard from '@components/auth/AuthCard';
import ForgotPasswordForm from '@components/auth/ForgotPasswordForm';

const CONTROLS = [
    {
        link: '/login',
        caption: 'AUTHORIZATION',
    },
];

function ForgotPasswordPage() {
    return (
        <AuthLayout className="p-forgot-password d-flex flex-column align-items-center justify-content-center">
            <AuthCard
                className="p-forgot-password__auth-card"
                title="RESTORE_PASSWORD"
                controls={CONTROLS}
                controlsClassName="d-flex justify-content-center align-items-center flex-column flex-sm-row"
            >
                <ForgotPasswordForm className="c-auth-card__form" />
            </AuthCard>
        </AuthLayout>
    );
}

export default withApollo(ForgotPasswordPage);
