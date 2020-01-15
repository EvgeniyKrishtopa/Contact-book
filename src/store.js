import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './reducers/index';
import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';

const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const configureStore = preloadedState => (
  createStore(
    rootReducer, 
    preloadedState,
    composeEnhancers(
     applyMiddleware(logger,ReduxThunk)
    ),
  )
)

const store = configureStore({});

export default store;