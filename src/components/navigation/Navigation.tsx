import React from 'react';
import {
    NavItem,
    Nav
} from 'reactstrap';
import Link from 'next/link';
import * as classNames from 'classnames';
import { ClassNameType } from 'globals';

import './Navigation.scss';

export type NavigationPropsType = {} & ClassNameType;

export default function Navigation({ className }: NavigationPropsType) {
    return (
        <Nav className={classNames('c-navigation', 'align-items-lg-center', className)} navbar>
            <NavItem>
                <Link href="/page1">
                    <a className="ml-lg-1" title="Page1">
                        <i className="ni ni-air-baloon" />
                        <span className="nav-link-inner--text ml-2">Page1</span>
                    </a>
                </Link>
            </NavItem>
            <NavItem>
                <Link href="/page2">
                    <a className="ml-lg-3" title="Page2">
                        <i className="ni ni-air-baloon" />
                        <span className="nav-link-inner--text ml-2">Page2</span>
                    </a>
                </Link>
            </NavItem>
        </Nav>
    );
}
