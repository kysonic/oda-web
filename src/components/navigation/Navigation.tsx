import React, { Fragment } from 'react';
import { NavItem, Nav, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import Link from 'next/link';
import * as classNames from 'classnames';
import { ClassNameType } from 'globals';

import './Navigation.scss';

export type NavigationItemPropsType = {
    href?: string;
    title: string;
    icon?: string;
    onClick?: Function;
} & ClassNameType;

export type NavigationItemWrapperPropsType = {
    href: string;
    children: React.ReactNode;
}

export function NavigationItemWrapper({ href, children }: NavigationItemWrapperPropsType) {
    if (href) {
        return (
            <Link href={href}>
                {children}
            </Link>
        );
    }

    return (
        <div>
            {children}
        </div>
    );
}

export function NavigationItem({ className, href, title, icon = 'air-baloon', onClick }: NavigationItemPropsType) {
    return (
        <NavItem className={classNames('c-navigation-item', className)}>
            <NavigationItemWrapper href={href}>
                <NavLink className="c-navigation__link" title={title} onClick={onClick}>
                    <i className={`c-navigation__icon mr-1 ni ni-${icon}`} />
                    <span className="c-navigation__text nav-link-inner--text">{title}</span>
                </NavLink>
            </NavigationItemWrapper>
        </NavItem>
    );
}

export type NavigationItemDropdownPropsType = {
    title: string;
    children: React.ReactNode;
    icon?: string;
} & ClassNameType;

export function NavigationItemDropdown({ className, children, title, icon = 'air-baloon' }: NavigationItemDropdownPropsType) {
    return (
        <NavItem className={classNames('c-navigation-dropdown', className)}>
            <Nav className="c-navigation-dropdown__navigation navbar-nav-hover align-items-lg-center" navbar>
                <UncontrolledDropdown className="c-navigation-dropdown__dropdown" nav>
                    <DropdownToggle className="c-navigation-dropdown__toggle" nav>
                        <i className={`c-navigation-dropdown mr-1 ni ni-${icon}`} />
                        <span className="c-navigation-dropdown__text nav-link-inner--text">{title}</span>
                    </DropdownToggle>
                    <DropdownMenu className="c-navigation-dropdown__menu">
                        <Nav className="c-navigation-dropdown__menu-inner dropdown-menu-inner" navbar>
                            {children}
                        </Nav>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </Nav>
        </NavItem>
    );
}

export type NavigationPropsType = {} & ClassNameType;

export default function Navigation({ className }: NavigationPropsType) {
    return (
        <Nav className={classNames('c-navigation align-items-lg-center', className)} navbar>
            <NavigationItem className="c-navigation__item" href="/page1" title="Page1" />
            <NavigationItemDropdown className="c-navigation__item c-navigation__item--dropdown" title="Dropdown">
                <NavigationItem className="c-navigation__item" href="/page2" title="Page2" />
                <NavigationItem className="c-navigation__item" href="/page3" title="Page3" />
            </NavigationItemDropdown>
        </Nav>
    );
}
