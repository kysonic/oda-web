import React, { useEffect } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { redirect } from '@services/next';

export const CARDS_QUERY = gql`
    query {
        myUser {
            id
            name
            email
            emailApproved
            role {
                id
                name
            }
        }
    }
`;

export default function AuthChecker() {
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

    useEffect(() => {
        if (!data.myUser) {
            redirect({ where: '/login' });
        }
    }, [data]);


    return null;
}
