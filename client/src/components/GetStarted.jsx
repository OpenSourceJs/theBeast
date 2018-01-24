import React from 'react';
import { Paper, Typography, withStyles } from 'material-ui';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: 115,
    marginLeft: 235,
    width: 900,
    height: 600,
  }),
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  flex: {
    flex: 1,
    textAlign: 'center',
    marginBottom: 45,
  },
});

const GetStarted = props => {
  let { classes } = props;
  return (
    <div>
      <Paper className={classes.root} elevation={6}>
        <Typography className={classes.flex} type="display1">
          Get Started
        </Typography>
        <Typography type="display1">
          Welcome to the Beast framework it is a full stack application that is
          powered Node as a server(express) a database mongodb and react-redux
          as it views layout.
        </Typography>
      </Paper>
    </div>
  );
};
export default withStyles(styles)(GetStarted);
