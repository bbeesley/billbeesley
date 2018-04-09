// @flow

import React from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import SocialLogo from 'social-logos';
import classNames from 'classnames';
import withRoot from './withRoot';
import Avatar from './components/Avatar/Avatar';
import { EXTERNAL_LINKS } from './constants';

const styles = (theme: Object) => ({
    root: {
        textAlign: 'center',
        paddingTop: theme.spacing.unit * 20,
    },
    row: {
        display: 'flex',
        justifyContent: 'center',
    },
    invisibutton: {
        cursor: 'pointer',
    }
});

type PropsType = {
    classes: Object,
};

const navigate = (page: string): void => location.href=EXTERNAL_LINKS[page];

const App = (props: PropsType) => (
    <div className={props.classes.root}>
        <Avatar />
        <Typography variant="display1" gutterBottom>
            Bill Beesley
        </Typography>
        <Typography variant="subheading" gutterBottom>
            My personal page, currently a work in progress.
        </Typography>
        <div className={props.classes.row}>
            <div className={props.classes.invisibutton}>
                <SocialLogo icon="twitter" onClick={() => navigate('twitter')} />
            </div>
            <div className={props.classes.invisibutton}>
                <SocialLogo icon="github" onClick={() => navigate('github')} />
            </div>
            <div className={props.classes.invisibutton}>
                <SocialLogo icon="linkedin" onClick={() => navigate('linkedin')} />
            </div>
        </div>
    </div>
);

export default withRoot(withStyles(styles)(App));
