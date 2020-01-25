import React from 'react';
import * as classNames from 'classnames';
import { ClassNameType } from 'globals';
import { Carousel, CarouselItem } from 'reactstrap';

export type CarouselPropsType = {
    children: React.ReactNode;
    activeIndex: number;
} & ClassNameType;

export default function OdaCarousel({ className, children, activeIndex }: CarouselPropsType) {
    return (
        <Carousel
            className={classNames('c-carousel', className)}
            activeIndex={activeIndex}
            next={() => {}}
            previous={() => {}}
        >
            {
                children.map((Component) => (
                    <CarouselItem key={Component.key}>
                        {Component}
                    </CarouselItem>
                ))
            }
        </Carousel>
    );
}
