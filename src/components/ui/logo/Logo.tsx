import React from 'react';
import Link from 'next/link';
import * as classNames from 'classnames';
import { ClassNameType } from 'globals';
import LogoSvg from '@svg/logo.svg';

import './Logo.scss';

export type HeaderLogoPropsType = {} & ClassNameType

export default function Logo({ className }: HeaderLogoPropsType) {
    return (
        <Link href="/">
            <a className={classNames('c-logo', className)} title="Oda">
                <LogoSvg />
            </a>
        </Link>
    );
}
