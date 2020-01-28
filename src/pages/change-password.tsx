import React from 'react';
import AuthLayout from '@components/layouts/auth/AuthLayout';
import { withApollo } from '@services/next-apollo';
import AuthCard from '@components/auth/AuthCard';
import ChangePasswordForm from '@components/auth/ChangePasswordForm';

function ChangePasswordPage() {
    return (
        <AuthLayout className="p-login d-flex flex-column align-items-center justify-content-center">
            <AuthCard
                className="p-login__auth-card"
                title="CHANGE_PASSWORD"
                controlsClassName="d-flex justify-content-between align-items-center flex-column flex-sm-row"
            >
                <ChangePasswordForm mode="signIn" className="c-auth-card__form" />
            </AuthCard>
        </AuthLayout>
    );
}

export default withApollo(ChangePasswordPage);
