import React from 'react';
import Link from 'next/link';
import * as classNames from 'classnames';
import { ClassNameType } from 'globals';
import LogoSvg from '@svg/logo.svg';

export type HeaderLogoPropsType = {} & ClassNameType

export default function Logo({ className }: HeaderLogoPropsType) {
    return (
        <Link href="/">
            <a className={classNames('c-logo', 'mr-lg-5', className)} title="Oda">
                <LogoSvg />
            </a>
        </Link>
    );
}
