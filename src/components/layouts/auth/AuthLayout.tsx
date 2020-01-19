import React from 'react';
import { ClassNameType } from 'globals';
import * as classNames from 'classnames';
import AuthLayoutHeader from './AuthLayoutHeader';
import AuthLayoutFooter from './AuthLayoutFooter';

import './AuthLayout.scss';

export type DefaultLayoutPropsType = {
    children: React.ReactNode;
} & ClassNameType

export default function AuthLayout({ children, className }: DefaultLayoutPropsType) {
    return (
        <div className={classNames('l-auth d-flex flex-column flex-grow-1 justify-content-around', className)}>
            <AuthLayoutHeader className="l-auth__header" />
            <div className="l-auth__content">
                {children}
            </div>
            <AuthLayoutFooter className="l-auth__footer" />
        </div>
    );
}
