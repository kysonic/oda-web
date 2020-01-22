import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { redirect } from '@services/next';
import { MY_USER_QUERY } from '@graphql/user';

export default function AuthChecker() {
    const { loading, error, data } = useQuery(
        MY_USER_QUERY,
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
