import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from '../reducers/rootReducer';

const configStore = () =>
  createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, logger)));

export default configStore;
