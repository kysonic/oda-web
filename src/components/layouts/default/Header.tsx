import React from 'react';
import { UncontrolledCollapse, Navbar, Row, Col } from 'reactstrap';
import Link from 'next/link';
import Navigation from '@components/navigation/Navigation';
import UserMenu from '@components/auth/UserMenu';
import * as classNames from 'classnames';
import { ClassNameType } from 'globals';

import './Header.scss';

export type HeaderLogoPropsType = {} & ClassNameType

export function HeaderLogo({ className }: HeaderLogoPropsType) {
    return (
        <Link href="/">
            <a className={classNames('c-header-logo', 'mr-lg-5', className)} title="Home">
                <img alt="ODA WEB" src="img/logo.jpg" />
            </a>
        </Link>
    );
}

export type HeaderCollapseHeaderPropsType = {} & ClassNameType

function HeaderCollapseHeader({ className }: HeaderCollapseHeaderPropsType) {
    return (
        <div className={classNames('c-header-collapse-header', 'navbar-collapse-header', className)}>
            <Row className="c-header-collapse-header__row">
                <Col className="c-header-collapse-header__brand collapse-brand" xs="6">
                    <h4>Menu</h4>
                </Col>
                <Col className="c-header-collapse-header__close collapse-close" xs="6">
                    <button type="button" className="c-header-collapse-header__close-button navbar-toggler" id="toggler">
                        <span />
                        <span />
                    </button>
                </Col>
            </Row>
        </div>
    );
}

export default function Header() {
    return (
        <Row className="c-header">
            <Col className="c-header__col">
                <Navbar className="c-header__navbar navbar-main navbar-light" expand="lg">
                    <HeaderLogo className="c-header__logo" />
                    <button type="button" className="c-header__burger navbar-toggler" id="toggler">
                        <i className="ni ni-bold-down" />
                    </button>
                    <UncontrolledCollapse className="c-header__collapse" navbar toggler="#toggler">
                        <HeaderCollapseHeader className="c-header__collapse-header" />
                        <div className="c-header__menu-wrapper">
                            <Navigation className="c-header__navigation" />
                            <UserMenu className="c-header__user-menu mr-3" />
                        </div>
                    </UncontrolledCollapse>
                </Navbar>
            </Col>
        </Row>
    );
}
