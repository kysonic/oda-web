import React, { useCallback, useState } from 'react';
import {
    Container,
} from 'reactstrap';
import ChangePasswordForm from '../components/auth/ChangePasswordForm';

export default function ChangePasswordView() {
    return (
        <Container className="container" fluid="lg">
            <ChangePasswordForm />
        </Container>
    );
}
