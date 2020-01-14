import React from 'react';
import * as classNames from 'classnames';
import { ClassNameType } from 'globals';
import { Nav } from 'reactstrap';
import { NavigationItem, NavigationItemDropdown } from '@components/navigation/Navigation';

import './UserMenu.scss';

type UserMenuPropsType = {} & ClassNameType;

export default function UserMenu({ className }: UserMenuPropsType) {
    return (
        <Nav className={classNames('c-user-menu', className)}>
            <NavigationItemDropdown className="c-user-menu__item" icon="badge" title="soooyc@gmail.com">
                <NavigationItem className="c-navigation__item" href="/profile" title="Profile" />
                <NavigationItem className="c-navigation__item" onClick={() => console.log('Logout')} title="Logout" />
            </NavigationItemDropdown>
        </Nav>
    );
}
