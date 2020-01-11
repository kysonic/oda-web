import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Header from './Header';
import Footer from './Footer';

import './DefaultLayout.scss';

export type DefaultLayoutPropsType = {
    children: React.ReactNode;
}

export default function DefaultLayout({ children }: DefaultLayoutPropsType) {
    return (
        <Container className="l-default" fluid>
            <Header className="l-default__header" />
            <Row className="l-default__content">
                <Col className="l-default__content-col">
                    {children}
                </Col>
            </Row>
            <Footer className="l-default__footer" />
        </Container>
    );
}
