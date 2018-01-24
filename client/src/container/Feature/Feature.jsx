import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Paper, Typography, withStyles } from 'material-ui';
import { fetchMessage } from '../../action/actionCreators/authActionCreators';
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

class Feature extends Component {
  static propTypes = {
    fetchMessage: PropTypes.func,
    message: PropTypes.string,
  };

  componentWillMount() {
    this.props.fetchMessage();
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root} elevation={6}>
        <Typography className={classes.flex} type="display1">
          {this.props.message}
        </Typography>
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return {
    message: state.auth.message,
  };
}
export default withStyles(styles)(
  connect(mapStateToProps, { fetchMessage })(Feature),
);
