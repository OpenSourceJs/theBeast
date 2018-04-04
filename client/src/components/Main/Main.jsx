import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import { Button, Typography } from 'material-ui';

const styles = theme => ({
  root: {
    textAlign: 'center',
    marginTop: 234,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

const Main = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Typography type="display3">Welcome to the Beast</Typography>
      <Button
        component={Link}
        to="/getstarted"
        variant="raised"
        color="primary"
        className={classes.button}
      >
        Get Started
      </Button>
    </div>
  );
};

export default withStyles(styles)(Main);
