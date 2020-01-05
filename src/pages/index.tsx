import { NextPage } from 'next';
import Button from '@material-ui/core/Button';

const Home: NextPage<{ userAgent: string }> = ({ userAgent }) => (
    <Button variant="contained" color="primary">
        Hello World
    </Button>
);

Home.getInitialProps = async ({ req }) => {
    const userAgent = req ? req.headers['user-agent'] || '' : navigator.userAgent;
    return { userAgent };
};

export default Home;
