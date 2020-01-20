import React from 'react';
import * as classNames from 'classnames';
import { ClassNameType } from 'globals';
import Line from '@components/ui/line/Line';
import { Container, Row, Col } from 'reactstrap';
import Icons from '@components/icons';
import Copyright from '@components/ui/copyright/Copyright';

import './AythLayoutFooter.scss';

export type FooterItemPropsType = {
    icon: string;
    text: string;
} & ClassNameType;

export function FooterItem({ icon = 'EmailIcon', text = '', className }: FooterItemPropsType) {
    const Icon = Icons[icon];

    return (
        <Col
            className={classNames('c-footer-item d-flex flex-md-column flex-xs-row align-items-center justify-content-center', className)}
            xs={12}
            md={4}
        >
            <div className="c-footer-item__icon">
                <Icon />
            </div>
            <div className="c-footer-item__text">
                { text }
            </div>
        </Col>
    );
}

export type FooterPropsType = {} & ClassNameType;

export default function AuthLayoutFooter({ className }: FooterPropsType) {
    return (
        <Container className={classNames('c-footer', className)} fluid>
            <Row className="c-footer__row">
                <Col className="c-footer__col">
                    <Line className="c-footer__line" />
                </Col>
            </Row>
            <Row className="c-footer__row c-footer__items">
                <FooterItem
                    className="c-footer__item"
                    icon="PhoneIcon"
                    text="+7 (999) 999 9999"
                />
                <FooterItem
                    className="c-footer__item"
                    icon="EmailIcon"
                    text="clients@oda.io"
                />
                <FooterItem
                    className="c-footer__item"
                    icon="TelegramIcon"
                    text="oda-it"
                />
            </Row>
            <Row className="c-footer__row">
                <Col className="c-footer__col">
                    <Copyright />
                </Col>
            </Row>
        </Container>
    );
}
