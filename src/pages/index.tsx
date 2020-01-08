import React, { useEffect } from 'react';
import { NextPage } from 'next';
import Signup from '@components/auth/Signup';
import globalStore from '@stores/global';

const Home: NextPage = () => {
    useEffect(() => {
        console.log(globalStore.userStore);
    }, []);

    return (
        <Signup />
    );
};

export default Home;
