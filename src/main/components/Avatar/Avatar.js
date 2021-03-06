import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import me from './Avatar_small.jpg';

const styles = {
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 120,
    height: 120,
  },
};

const ImageAvatar = ({ classes }) => (
  <div className={classes.row}>
    <Avatar
        alt="Bill Beesley"
        src={me}
        className={classNames(classes.avatar, classes.bigAvatar)}
      />
      </div>
  );
export default withStyles(styles)(ImageAvatar);
