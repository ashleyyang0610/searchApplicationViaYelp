import { createAction } from 'redux-actions';
import { Observable } from 'rxjs/Rx';
import store from 'ducks/configureStore';
import { sendRequest } from 'utils/httpService';
import {
    UPDATE_NOTIFICATION,
    UPDATE_ISFIRSTACCESS
} from './globals';

/*
 * action types
 */
export const UPDATE_LOCATION = 'UPDATE_LOCATION';
export const UPDATE_DATETIME = 'UPDATE_DATETIME';
export const SUBMIT_SEARCH_REQUEST = 'SUBMIT_SEARCH_REQUEST';
export const RESET_SEARCH_DEFAULT = 'RESET_SEARCH_DEFAULT';
export const UPDATE_DATA = 'UPDATE_DATA';
export const SET_FETCHING = 'SET_FETCHING';

/*
 * initial state
 */
const searchState = {
    location: '',
    dateTime: {},
    data: [],
    isFetching: false
};

/*
 * reducer
 */
export default function search(state = searchState, action) {
    switch (action.type) {
    case RESET_SEARCH_DEFAULT: {
        const newState = {
            ...state,
            location: '',
            dateTime: {},
            data: [],
            isFetching: false
        };
        return newState;
    }
    case UPDATE_LOCATION: {
        const newState = {
            ...state,
            location: action.payload
        };
        return newState;
    }
    case UPDATE_DATETIME: {
        const newState = {
            ...state,
            dateTime: action.payload
        };
        return newState;
    }
    case UPDATE_DATA: {
        const newState = {
            ...state,
            data: action.payload
        };
        return newState;
    }
    case SET_FETCHING: {
        const newState = {
            ...state,
            isFetching: action.payload
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
export const updateLocation = createAction(UPDATE_LOCATION);
export const updateDateTime = createAction(UPDATE_DATETIME);
export const submitSearchRequest = createAction(SUBMIT_SEARCH_REQUEST);
export const resetSearchDefault = createAction(RESET_SEARCH_DEFAULT);
export const updateData = createAction(UPDATE_DATA);
export const setFetching = createAction(SET_FETCHING);

const normalizeData = (items) => {
    const flatData = [];

    items.forEach((each) => {
        flatData.push({
            categories: each.categories,
            display_phone: each.display_phone,
            location: each.location.display_address.join(', '),
            name: each.name,
            price: each.price,
            rating: each.rating
        });
    });

    return flatData;
};
/*
 * epic
 */
export const submitSearchRequestEpic = action$ =>
    action$.ofType(SUBMIT_SEARCH_REQUEST)
        .switchMap(action =>
            Observable.concat(
                Observable.of({
                    type: SET_FETCHING,
                    payload: true
                }),
                Observable.of({
                    type: UPDATE_NOTIFICATION,
                    payload: ''
                }),
                store.getState().globals.isFirstAccess ? Observable.of({
                    type: UPDATE_ISFIRSTACCESS,
                    payload: false
                }) : Observable.empty(),
                Observable.fromPromise(sendRequest('GET_SEARCH_RESULT', action.payload))
                    .switchMap((data) => {
                        const normalizeResult = normalizeData(data.businesses);
                        return Observable.concat(
                            Observable.of({
                                type: UPDATE_DATA,
                                payload: normalizeResult
                            }),
                            Observable.of({
                                type: SET_FETCHING,
                                payload: false
                            })
                        );
                    })
                    .catch((err) => {
                        return Observable.concat(
                            Observable.of({
                                type: UPDATE_DATA,
                                payload: []
                            }),
                            Observable.of({
                                type: SET_FETCHING,
                                payload: false
                            }),
                            Observable.of({
                                type: UPDATE_NOTIFICATION,
                                payload: err.description
                            })
                        );
                    })
            )
        );
