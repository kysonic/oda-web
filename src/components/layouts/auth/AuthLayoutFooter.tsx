import React from 'react';
import * as classNames from 'classnames';
import { ClassNameType } from 'globals';
import Line from '@components/ui/line/Line';
import { Container, Row, Col } from 'reactstrap';

export type FooterPropsType = {} & ClassNameType;

export default function AuthLayoutFooter({ className }: FooterPropsType) {
    return (
        <Container className={classNames('c-footer', className)} fluid>
            <Row className="c-footer__row">
                <Col className="c-footer__col">
                    <Line className="c-footer__line" />
                </Col>
            </Row>
            <Row className="c-footer__row">
                <Col className="c-footer__col" xs={12} xl={4}>1</Col>
                <Col className="c-footer__col" xs={12} xl={4}>2</Col>
                <Col className="c-footer__col" xs={12} xl={4}>3</Col>
            </Row>
            <Row className="c-footer__row">
                <Col className="c-footer__col">
                    Copyright
                </Col>
            </Row>
        </Container>
    );
}
