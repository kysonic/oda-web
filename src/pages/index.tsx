import React, { useEffect } from 'react';
import { NextPage } from 'next';
import Signup from '@components/auth/Signup';

const Home: NextPage = (props) => {
    return (
        <Signup />
    );
};

export default Home;
