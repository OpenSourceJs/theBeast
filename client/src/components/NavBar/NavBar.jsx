import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, withStyles } from 'material-ui';
import './NavBar.css';

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
};

class NavBar extends Component {
  static propTypes = {
    authenticated: PropTypes.bool,
  };

  renderLinks() {
    if (this.props.authenticated) {
      return (
        <Button color="contrast" component={Link} to="/signout">
          Sign Out
        </Button>
      );
    } else {
      return [
        <div key="0">
          <Button color="contrast" component={Link} to="/signin">
            Sign In
          </Button>
        </div>,
        <div key="1">
          <Button color="contrast" component={Link} to="/signup">
            Sign Up
          </Button>
        </div>,
      ];
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar>
          <Toolbar>
            <Typography type="title" className={classes.flex}>
              <Button color="contrast" component={Link} to="/">
                Beast
              </Button>
            </Typography>
            {this.renderLinks()}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated,
  };
};

export default withStyles(styles)(connect(mapStateToProps, null)(NavBar));
