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
            <Header />
            <Row>
                <Col>
                    {children}
                </Col>
            </Row>
            <Footer />
        </Container>
    );
}
