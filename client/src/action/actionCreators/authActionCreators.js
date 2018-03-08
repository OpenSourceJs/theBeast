import axios from 'axios';
import {
  AUTH_ERROR,
  AUTH_USER,
  UNAUTH_USER,
  FETCH_MESSAGE,
} from '../actionTypes/authActionTypes';

const ROOT_URL = 'http://localhost:4000';

const authUser = () => {
  return { type: AUTH_USER };
};

const authError = error => {
  return {
    type: AUTH_ERROR,
    payload: error,
  };
};

export const signupUser = (email, password, callback) => {
  return dispatch => {
    const signupUrl = `${ROOT_URL}/signup`;

    axios
      .post(signupUrl, {
        email,
        password,
      })
      .then(response => {
        console.log(response);
        // If request is good...
        // Update state to indicate user is authenticated
        dispatch(authUser());

        // Save the JWT token
        localStorage.setItem('token', response.data.token);
      })
      .then(() => callback())
      .catch(error => {
        // If request is bad...
        // Show an error to the user
        dispatch(authError(error.response.data.error));
      });
  };
};

export const signinUser = ({ email, password }, callback) => {
  return dispatch => {
    // Submit email/password to the server
    const signinUrl = `${ROOT_URL}/signin`;
    axios
      .post(signinUrl, {
        email,
        password,
      })
      .then(response => {
        console.log(response);
        // If request is good...
        // Update state to indicate user is authenticated
        dispatch(authUser());

        // Save the JWT token
        localStorage.setItem('token', response.data.token);
      })
      .then(() => callback())
      .catch(() => {
        // If request is bad...
        // Show an error to the user
        dispatch(authError('Bad Login Info'));
      });
  };
};

export const signoutUser = () => {
  localStorage.removeItem('token');
  return {
    type: UNAUTH_USER,
  };
};

export const fetchMessage = () => {
  return dispatch => {
    const featureUrl = `${ROOT_URL}/feature`;
    axios
      .get(featureUrl, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
      .then(response => {
        console.log(response);
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message,
        });
      });
  };
};
