import React from 'react';
import { ClassNameType } from 'globals';
import * as classNames from 'classnames';

export type LoginPasswordFormPropsType = {} & ClassNameType;

export default function LoginPasswordForm({ className }: LoginPasswordFormPropsType) {
    return (
        <div className={classNames('c-login-password-form', className)}>
            Form
        </div>
    );
}
