import React from 'react';
import * as classNames from 'classnames';
import { ClassNameType } from 'globals';
import { Nav } from 'reactstrap';
import { NavigationItem, NavigationItemDropdown } from '@components/navigation/Navigation';
import { useQuery } from '@apollo/react-hooks';
import { MY_USER_QUERY } from '@graphql/user';
import { redirect } from '@services/next';

import './UserMenu.scss';

type UserMenuPropsType = {} & ClassNameType;

export default function UserMenu({ className }: UserMenuPropsType) {
    const { data } = useQuery(
        MY_USER_QUERY
    );

    const logout = () => {
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
        redirect({ where: '/login' });
    };

    return (
        <Nav className={classNames('c-user-menu', className)}>
            <NavigationItemDropdown className="c-user-menu__item" icon="badge" title={data?.myUser?.email}>
                <NavigationItem className="c-navigation__item" href="/profile" title="Profile" />
                <NavigationItem className="c-navigation__item" onClick={logout} title="Logout" />
            </NavigationItemDropdown>
        </Nav>
    );
}
