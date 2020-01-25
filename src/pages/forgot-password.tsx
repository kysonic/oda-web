import React from 'react';
import AuthLayout from '@components/layouts/auth/AuthLayout';
import ForgotPasswordCard from '@components/auth/ForgotPasswordCard';
import { withApollo } from '@services/next-apollo';

function LoginPage() {
    return (
        <AuthLayout className="p-login d-flex flex-column align-items-center justify-content-center">
            <ForgotPasswordCard />
        </AuthLayout>
    );
}

export default withApollo(LoginPage);
