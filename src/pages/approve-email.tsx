import React from 'react';
import AuthLayout from '@components/layouts/auth/AuthLayout';
import { withApollo } from '@services/next-apollo';
import AuthCard from '@components/auth/cards/AuthCard';
import ApproveEmailForm from '@components/auth/forms/ApproveEmailForm/ApproveEmailForm';

const CONTROLS = [
    {
        link: '/login',
        caption: 'AUTHORIZATION',
    },
];

function ApproveEmailPage() {
    return (
        <AuthLayout className="p-approve-password d-flex flex-column align-items-center justify-content-center">
            <AuthCard
                className="p-approve-password__auth-card"
                title="APPROVE_EMAIL"
                controls={CONTROLS}
                controlsClassName="d-flex justify-content-center align-items-center flex-column flex-sm-row"
            >
                <ApproveEmailForm className="c-auth-card__form" />
            </AuthCard>
        </AuthLayout>
    );
}

export default withApollo(ApproveEmailPage);
