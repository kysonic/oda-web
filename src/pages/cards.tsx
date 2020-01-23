import React from 'react';
import DefaultLayout from '@components/layouts/default/DefaultLayout';
import Cards from '@components/cards/Cards';
import { withApollo, withAuth } from '@services/next-apollo';

function ChangePasswordPage() {
    return (
        <DefaultLayout>
            <Cards />
        </DefaultLayout>
    );
}

export default withApollo(withAuth(ChangePasswordPage));
