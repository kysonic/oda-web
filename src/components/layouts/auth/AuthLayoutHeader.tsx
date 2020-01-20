import React from 'react';
import * as classNames from 'classnames';
import { ClassNameType } from 'globals';
import Logo from '@components/ui/logo/Logo';

export type AuthLayoutHeaderPropsType = {} & ClassNameType

export default function AuthLayoutHeader({ className }: AuthLayoutHeaderPropsType) {
    return (
        <div className={classNames('c-auth-layout-header d-flex justify-content-center align-items-center', className)}>
            <Logo className="c-auth-layout-header__logo" />
        </div>
    );
}
