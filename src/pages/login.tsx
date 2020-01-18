import React from 'react';
import LoginPasswordForm from '@components/auth/LoginPasswordForm';
import AuthLayout from '@components/layouts/auth/AuthLayout';
import { translate } from '@i18n/index';

import './login.scss';

export default function LoginPage() {
    return (
        <AuthLayout className="p-login">
            <h1 className="p-login__title font-weight-bold text-center">{translate('AUTHORIZATION')}</h1>
            <LoginPasswordForm className="p-login__form" />
        </AuthLayout>
    );
}
