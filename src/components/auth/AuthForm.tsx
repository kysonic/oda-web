import React, { useState } from 'react';
import * as classNames from 'classnames';
import { ClassNameType } from 'globals';
import { translate } from '@i18n/index';
import LoginPasswordForm from '@components/auth/LoginPasswordForm';
import { Carousel, CarouselItem } from 'reactstrap';

import './AuthForm.scss';

export type AuthFormPropsType = {} & ClassNameType;

const MAP_SLIDE_INDEX_TO_RIGHT_CONTROL_TITLE = ['DO_NOT_HAVE_ACCOUNT_YET', 'RETURN_TO_SING_IN', 'RETURN_TO_SING_IN'];
const MAP_MAP_SLIDE_INDEX_TO_FORM_TITLE = ['AUTHORIZATION', 'REGISTRATION', 'FORGOT_PASSWORD'];

export default function AuthForm({ className }: AuthFormPropsType) {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className={classNames('c-auth-form d-flex flex-column align-items-center justify-content-between', className)}>
            <h1 className="c-auth-form__title font-weight-bold text-center">{translate(MAP_MAP_SLIDE_INDEX_TO_FORM_TITLE[activeIndex])}</h1>
            <Carousel
                className={`c-auth-form__carousel c-auth-form__carousel--active-${activeIndex}`}
                activeIndex={activeIndex}
                next={() => {}}
                previous={() => {}}
            >
                {
                    [
                        (
                            <CarouselItem key="sign-in-from">
                                <LoginPasswordForm mode="signIn" className="c-auth-form__form" />
                            </CarouselItem>
                        ),
                        (
                            <CarouselItem key="sign-up-from">
                                <LoginPasswordForm mode="signUp" className="c-auth-form__form" />
                            </CarouselItem>
                        ),
                    ]
                }
            </Carousel>
            <div className="c-auth-form__controls d-flex justify-content-between align-items-center flex-column flex-sm-row">
                <a href="#" className="c-auth-form__forgot-password">{translate('FORGOT_PASSWORD')}</a>
                <a
                    href="#"
                    className="c-auth-form__register"
                    onClick={() => setActiveIndex(Math.abs(1 - activeIndex))}
                >
                    {translate(MAP_SLIDE_INDEX_TO_RIGHT_CONTROL_TITLE[activeIndex])}
                </a>
            </div>
        </div>
    );
}
