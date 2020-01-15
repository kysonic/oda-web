import React from 'react';
import { NextPage } from 'next';
import FormFactory from '@components/form/Form';

const FIELDS = {
    email: {
        type: 'text',
        name: 'email',
        label: 'Email',
        validation: 'email',
    },
};

const Home: NextPage = () => (
    <>
        <FormFactory fields={FIELDS} />
    </>
);

export default Home;
