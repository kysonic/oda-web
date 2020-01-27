import React from 'react';
import AuthLayout from '@components/layouts/auth/AuthLayout';
import AuthCard from '@components/auth/AuthCard';
import { withApollo } from '@services/next-apollo';
import LoginPasswordForm from '@components/auth/LoginPasswordForm';

const CONTROLS = [
    {
        link: '/forgot-password',
        caption: 'FORGOT_PASSWORD',
    },
    {
        link: '/registration',
        caption: 'DO_NOT_HAVE_ACCOUNT_YET',
    },
];

function LoginPage() {
    return (
        <AuthLayout className="p-login d-flex flex-column align-items-center justify-content-center">
            <AuthCard
                className="p-login__auth-card"
                title="AUTHORIZATION"
                controls={CONTROLS}
                controlsClassName="d-flex justify-content-between align-items-center flex-column flex-sm-row"
            >
                <LoginPasswordForm mode="signIn" className="p-login__form c-auth-card__form" />
            </AuthCard>
        </AuthLayout>
    );
}

export default withApollo(LoginPage);
