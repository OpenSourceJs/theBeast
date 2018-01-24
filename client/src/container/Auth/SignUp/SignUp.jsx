import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, propTypes } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { TextField, Paper, Typography, Button, withStyles } from 'material-ui';
import { Send } from 'material-ui-icons';
import { signupUser } from '../../../action/actionCreators/authActionCreators';
import { required } from '../validation';
import './SignUp.css';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: 175,
    marginLeft: 420,
    width: 509,
  }),
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    margin: theme.spacing.unit,
    width: 500,
  },
  flex: {
    flex: 1,
    textAlign: 'center',
  },
  sendButton: {
    marginTop: 0,
    marginLeft: 393,
    marginBottom: 23,
    paddingLeft: 7,
    paddingTop: 11,
    fontSize: 16,
  },

  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

class SignUp extends Component {
  static propTypes = {
    ...propTypes,
    signinUser: PropTypes.func,
    errorMessage: PropTypes.string,
  };

  handleFormSubmit({ email, password }) {
    this.props.signupUser(email, password);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div
          style={{
            color: 'red',
          }}
        >
          <p>Oops! {this.props.errorMessage}</p>
        </div>
      );
    }
  }

  renderTextField({ input, type, meta: { touched, error }, ...custom }) {
    return (
      <div>
        <TextField {...input} {...custom} type={type} />
        <p
          style={{
            color: 'red',
          }}
        >
          {touched ? error : ''}
        </p>
      </div>
    );
  }

  render() {
    let { classes, handleSubmit } = this.props;
    return (
      <div>
        <Paper className={classes.root} elevation={4}>
          <Typography className={classes.flex} type="display1" color="inherit">
            Sign Up
          </Typography>
          <form>
            <Field
              name="email"
              component={this.renderTextField}
              label="Email"
              type="text"
              className={classes.textField}
              validate={[required]}
            />
            <Field
              name="password"
              component={this.renderTextField}
              label="Password"
              type="Password"
              className={classes.textField}
              validate={[required]}
            />
            <Field
              name="passwordConfirm"
              component={this.renderTextField}
              label="Confirm Password"
              type="Password"
              className={classes.textField}
              validate={[required]}
            />
            {this.renderAlert()}
            <Button
              onClick={handleSubmit(this.handleFormSubmit.bind(this))}
              className={classes.sendButton}
              raised
              color="primary"
            >
              Sign Up
              <Send className={classes.rightIcon} />
            </Button>
            <Typography>
              Already a User? <Link to="/signin">Sign In Here!</Link>
            </Typography>
          </form>
        </Paper>
      </div>
    );
  }
}

// Sync field level validation for password match
const validateForm = values => {
  const errors = {};
  const { password, passwordConfirm } = values;
  if (password !== passwordConfirm) {
    errors.passwordConfirm = 'Password does not match.';
  }
  return errors;
};

const mapStateToProps = state => {
  return { errorMessage: state.auth.error };
};

export default reduxForm({
  form: 'signup',
  validate: validateForm,
})(withStyles(styles)(connect(mapStateToProps, { signupUser })(SignUp)));
