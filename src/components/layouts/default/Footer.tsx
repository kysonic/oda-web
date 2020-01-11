import React from 'react';
import * as classNames from 'classnames';
import { ClassNameType } from 'globals';

export type FooterPropsType = {} & ClassNameType;

export default function Footer({ className }: FooterPropsType) {
    return (
        <div className={classNames('c-footer', className)} />
    );
}
