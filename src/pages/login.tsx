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
                mode="signIn"
                controls={CONTROLS}
            />
        </AuthLayout>
    );
}

export default withApollo(LoginPage);
