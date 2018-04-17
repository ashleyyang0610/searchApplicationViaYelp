import { createAction } from 'redux-actions';

/*
 * action types
 */
export const RESET_GLOBAL_DEFAULT = 'RESET_GLOBAL_DEFAULT';
export const UPDATE_ISFIRSTACCESS = 'UPDATE_ISFIRSTACCESS';
export const UPDATE_NOTIFICATION = 'UPDATE_NOTIFICATION';

/*
 * initial state
 */
const globalsState = {
    isFirstAccess: true,
    notification: ''
};

/*
 * reducer
 */
export default function globals(state = globalsState, action) {
    switch (action.type) {
    case RESET_GLOBAL_DEFAULT: {
        const newState = {
            ...state,
            isFirstAccess: true,
            notification: ''
        };
        return newState;
    }
    case UPDATE_ISFIRSTACCESS: {
        const newState = {
            ...state,
            isFirstAccess: action.payload
        };
        return newState;
    }
    case UPDATE_NOTIFICATION: {
        const newState = {
            ...state,
            notification: action.payload
        };
        return newState;
    }
    default: {
        return state;
    }
    }
}

/*
 * action creators
 */
export const resetGlobalDefault = createAction(RESET_GLOBAL_DEFAULT);
export const updateIsFirsAccess = createAction(UPDATE_ISFIRSTACCESS);
export const updateNotification = createAction(UPDATE_NOTIFICATION);
