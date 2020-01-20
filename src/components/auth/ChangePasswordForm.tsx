import React from 'react';
import FormFactory from '@components/form/Form';
import { FieldsType } from 'globals';

const CHANGE_PASSWORD_FORM_FIELDS: FieldsType = {
    password: {
        type: 'text',
        name: 'password',
        fieldType: 'password',
        placeholder: 'Enter your password',
        validation: 'password',
        required: true,
    },
    confirmPassword: {
        type: 'text',
        name: 'confirmPassword',
        fieldType: 'password',
        placeholder: 'Confirm your password',
        validation: 'password',
        required: true,
    },
};

export default function ChangePasswordForm() {
    const onSubmit = (values) => {
        console.log('Submit', values);
    };

    return (
        <FormFactory
            fields={CHANGE_PASSWORD_FORM_FIELDS}
            onSubmit={onSubmit}
        />
    );
}
