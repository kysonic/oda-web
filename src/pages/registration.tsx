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
        link: '/login',
        caption: 'RETURN_TO_SING_IN',
    },
];

function RegistrationPage() {
    return (
        <AuthLayout className="p-registration d-flex flex-column align-items-center justify-content-center">
            <AuthCard
                className="p-registration__auth-card"
                title="REGISTRATION"
                controls={CONTROLS}
                controlsClassName="d-flex justify-content-between align-items-center flex-column flex-sm-row"
            >
                <LoginPasswordForm mode="signUp" className="p-registration__form c-auth-card__form" />
            </AuthCard>
        </AuthLayout>
    );
}

export default withApollo(RegistrationPage);
