import { combineReducers, applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';

import ContactReducer from './ContactReducer';

const appReducers = combineReducers({ ContactReducer });

let store = createStore(
    (state, action) => { return appReducers(state, action) },
    compose(applyMiddleware(thunk))
);

export default store;