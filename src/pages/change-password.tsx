import React from 'react';
import {
    Container,
} from 'reactstrap';
import ChangePasswordForm from '../components/auth/ChangePasswordForm';

export default function ChangePasswordPage() {
    return (
        <Container className="container" fluid="lg">
            <ChangePasswordForm />
        </Container>
    );
}
