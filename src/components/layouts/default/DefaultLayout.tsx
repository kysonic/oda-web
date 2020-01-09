import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Header from './Header';

export type DefaultLayoutPropsType = {
    children: React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    container: {
        padding: 0,
    },
}));

export default function DefaultLayout({ children }: DefaultLayoutPropsType) {
    const classes = useStyles();

    return (
        <Container maxWidth={false} className={classes.container}>
            <Grid container>
                <Header />
            </Grid>
            <Grid container>
                {children}
            </Grid>
            <Grid container>

            </Grid>
        </Container>
    );
}
