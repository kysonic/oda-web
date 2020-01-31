import React from 'react';
import AuthLayout from '@components/layouts/auth/AuthLayout';
import AuthCard from '@components/auth/cards/AuthCard';
import { withApollo } from '@services/next-apollo';
import SignInForm from '@components/auth/forms/SignInForm/SignInForm';

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
                <SignInForm className="p-login__form c-auth-card__form" />
            </AuthCard>
        </AuthLayout>
    );
}

export default withApollo(LoginPage);
