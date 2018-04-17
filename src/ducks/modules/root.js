import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import search, { submitSearchRequestEpic } from './search';
import globals from './globals';

export const rootEpic = combineEpics(
    submitSearchRequestEpic
);

const appReducer = combineReducers({
    globals,
    search
});

export const rootReducer = (state, action) => {
    let newStata;
    if (action.type !== 'INITIAL_ALL_STATE') {
        newStata = state;
    }

    return appReducer(newStata, action);
};
