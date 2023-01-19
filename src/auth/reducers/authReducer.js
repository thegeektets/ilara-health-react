import { SET_LOGGED_IN, SET_TOKEN } from '../actions/authActions'

const initialState = {
    loggedIn: false,
    token: null
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_LOGGED_IN:
            return {...state, loggedIn: action.loggedIn};
        case SET_TOKEN:
            return {...state, token: action.token};
        default:
            return state;
    }
}
