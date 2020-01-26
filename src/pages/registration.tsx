import React from 'react';
import AuthLayout from '@components/layouts/auth/AuthLayout';
import AuthCard from '@components/auth/AuthCard';
import { withApollo } from '@services/next-apollo';

const CONTROLS = [
    {
        link: '/forgot-password',
        caption: 'FORGOT_PASSWORD',
    },
    {
        link: '/login',
        caption: 'RETURN_TO_SING_IN',
    },
];

function LoginPage() {
    return (
        <AuthLayout className="p-login d-flex flex-column align-items-center justify-content-center">
            <AuthCard
                className="p-login__auth-card"
                title="REGISTRATION"
                mode="signUp"
                controls={CONTROLS}
            />
        </AuthLayout>
    );
}

export default withApollo(LoginPage);
