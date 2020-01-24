import React from 'react';
import * as classNames from 'classnames';
import { ClassNameType } from 'globals';
import { useQuery } from '@apollo/react-hooks';
import { CARDS_QUERY } from '@graphql/card';

export type CardsPropsType = {} & ClassNameType;

export default function Cards({ className }: CardsPropsType) {
    const { loading, error, data } = useQuery(
        CARDS_QUERY,
        {
            variables: {
                where: {},
                first: 10,
                slip: 0,
            },
        }
    );

    if (loading) {
        return (
            <div>Loading...</div>
        );
    }

    if (error) {
        return (
            <div>Error...</div>
        );
    }

    return (
        <div className={classNames('c-cards', className)}>
            {data.cards.map((card) => (
                <div key={card.id}>
                    {card.title}
                </div>
            ))}
        </div>
    );
}
