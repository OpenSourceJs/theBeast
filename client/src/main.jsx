import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { Route, BrowserRouter } from 'react-router-dom';
import configStore from './store/configStore';
import App from './components/App/App';
import MuiTheme from './components/MuiTheme';
import { AUTH_USER } from '../src/action/actionTypes/authActionTypes';

const token = localStorage.getItem('token');

if (token) {
  configStore.dispatch({ type: AUTH_USER });
}

const render = component => {
  ReactDOM.render(
    <AppContainer>
      <MuiTheme>
        <Provider store={configStore}>
          <BrowserRouter>
            <Route component={component} />
          </BrowserRouter>
        </Provider>
      </MuiTheme>
    </AppContainer>,
    document.querySelector('#root-container'),
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./components/App/App.jsx', () => {
    render(App);
  });
}
