// @flow

import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
// eslint-disable-next-line no-unused-vars
import classNames from 'classnames';
import { SocialIcon } from 'react-social-icons';
import withRoot from './withRoot';
import Avatar from './components/Avatar/Avatar';
import { EXTERNAL_LINKS } from './constants';

const styles = (theme: Object) => ({
    root: {
        textAlign: 'center',
        paddingTop: theme.spacing(20),
    },
    row: {
        display: 'flex',
        justifyContent: 'center',
        height: '32px',
    },
    btn: {
        padding: '1px 4px 1px 4px',
    },
});

type PropsType = {
    classes: Object,
};

const App = (props: PropsType) => (
    <div className={props.classes.root}>
        <Avatar />
        <Typography variant="h4" gutterBottom>
            Bill Beesley
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
            My personal page, currently a work in progress.
        </Typography>
        <div className={props.classes.row}>
            <div className={props.classes.btn}>
                <SocialIcon url={EXTERNAL_LINKS.github} style={{ height: 28, width: 28 }} />
            </div>
            <div className={props.classes.btn}>
                <SocialIcon url={EXTERNAL_LINKS.linkedin} style={{ height: 28, width: 28 }} />
            </div>
            <div className={props.classes.btn}>
                <SocialIcon url={EXTERNAL_LINKS.twitter} style={{ height: 28, width: 28 }} />
            </div>
        </div>
    </div>
);

export default withRoot(withStyles(styles)(App));
