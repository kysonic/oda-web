import React from 'react';
import DefaultLayout from '@components/layouts/default/DefaultLayout';
import Cards from '@components/cards/Cards';
import { withApollo } from '@services/next-apollo';

export default withApollo(function ChangePasswordPage() {
    return (
        <DefaultLayout>
            <Cards />
        </DefaultLayout>
    );
});
