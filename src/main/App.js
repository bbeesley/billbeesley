// @flow

import React from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import withRoot from './withRoot';

const styles = (theme: Object) => ({
    root: {
        textAlign: 'center',
        paddingTop: theme.spacing.unit * 20,
    },
});

type PropsType = {
  classes: Object,
};

const App = (props: PropsType) => (
    <div className={props.classes.root}>
        <Typography variant="display1" gutterBottom>
      Bill Beesley
        </Typography>
        <Typography variant="subheading" gutterBottom>
      My personal page, currently a work in progress.
        </Typography>
    </div>
);

export default withRoot(withStyles(styles)(App));
