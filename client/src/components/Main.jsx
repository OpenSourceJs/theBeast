import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import { Button, Typography } from 'material-ui';

const styles = theme => ({
  root: {
    textAlign: 'center'
  },
  button: {
    margin: theme.spacing.unit
  }
});

class Main extends React.Component {
  render() {
    let { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography type="display3">Welcome to JsStaterKit</Typography>

        <Button raised color="primary" className={classes.button}>
          Get Started
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(Main);
