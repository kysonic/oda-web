import React from 'react';
import AuthLayout from '@components/layouts/auth/AuthLayout';
import AuthForm from '@components/auth/AuthForm';

export default function LoginPage() {
    return (
        <AuthLayout className="p-login d-flex flex-column align-items-center justify-content-center">
            <AuthForm />
        </AuthLayout>
    );
}
