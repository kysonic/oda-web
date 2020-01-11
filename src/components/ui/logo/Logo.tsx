import React from 'react';
import Link from 'next/link';
import * as classNames from 'classnames';
import { ClassNameType } from 'globals';

export type HeaderLogoPropsType = {} & ClassNameType

export default function Logo({ className }: HeaderLogoPropsType) {
    return (
        <Link href="/">
            <a className={classNames('c-logo', 'mr-lg-5', className)} title="Home">
                <img alt="ODA WEB" src="img/logo.jpg" />
            </a>
        </Link>
    );
}
