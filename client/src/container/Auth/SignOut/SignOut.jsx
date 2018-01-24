import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Paper, Typography, withStyles } from 'material-ui';
import { signoutUser } from '../../../action/actionCreators/authActionCreators';
const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: 115,
    marginLeft: 235,
    width: 900,
    height: 100,
  }),

  flex: {
    flex: 1,
    textAlign: 'center',
    marginBottom: 45,
  },
});

class Signout extends Component {
  componentWillMount() {
    this.props.signoutUser();
  }
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root} elevation={6}>
        <Typography className={classes.flex} type="display1">
          Sorry to see you go...
        </Typography>
      </Paper>
    );
  }
}

export default withStyles(styles)(connect(null, { signoutUser })(Signout));
