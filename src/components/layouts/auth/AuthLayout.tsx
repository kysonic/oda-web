import React from 'react';
import { Container, Row, Col } from 'reactstrap';
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
        <Container className={classNames('l-auth d-flex flex-column flex-grow-1 justify-content-around', className)} fluid>
            <AuthLayoutHeader className="l-auth__header" />
            <Row className="l-auth__content">
                <Col className="l-auth__content-col">
                    {children}
                </Col>
            </Row>
            <AuthLayoutFooter className="l-auth__footer" />
        </Container>
    );
}
