import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { Route, BrowserRouter } from 'react-router-dom';
import configStore from './store/configStore.js';
import App from './components/App.jsx';
import MuiTheme from './components/MuiTheme.jsx';

const render = component => {
  ReactDOM.render(
    <AppContainer>
      <MuiTheme>
        <Provider store={configStore()}>
          <BrowserRouter>
            <Route component={component} />
          </BrowserRouter>
        </Provider>
      </MuiTheme>
    </AppContainer>,
    document.querySelector('#root-container')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./components/App.jsx', () => {
    render(App);
  });
}
