import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic, rootReducer } from './modules/root';

const epicMiddleware = createEpicMiddleware(rootEpic);
const composeRedux = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composeEnhancers = (process.env.NODE_ENV === 'dev') ? composeRedux : compose;
const middleware = (process.env.NODE_ENV === 'dev') ? applyMiddleware(epicMiddleware, logger) : applyMiddleware(epicMiddleware);

const store = createStore(
    rootReducer,
    composeEnhancers(
        middleware
    )
);

export default store;
