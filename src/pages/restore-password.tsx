import React from 'react';
import AuthLayout from '@components/layouts/auth/AuthLayout';
import RestorePasswordCard from '@components/auth/RestorePasswordCard';
import { withApollo } from '@services/next-apollo';

function LoginPage() {
    return (
        <AuthLayout className="p-login d-flex flex-column align-items-center justify-content-center">
            <RestorePasswordCard />
        </AuthLayout>
    );
}

export default withApollo(LoginPage);
