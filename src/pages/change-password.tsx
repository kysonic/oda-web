import React from 'react';
import AuthLayout from '@components/layouts/auth/AuthLayout';
import { withApollo } from '@services/next-apollo';
import ChangePasswordCard from '../components/auth/ChangePasswordCard';

function ChangePasswordPage() {
    return (
        <AuthLayout className="p-login d-flex flex-column align-items-center justify-content-center">
            <ChangePasswordCard />
        </AuthLayout>
    );
}

export default withApollo(ChangePasswordPage);
