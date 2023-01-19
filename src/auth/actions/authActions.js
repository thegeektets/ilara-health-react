export const SET_LOGGED_IN = 'SET_LOGGED_IN';
export const SET_TOKEN = 'SET_TOKEN';

export function setLoggedIn(loggedIn) {
    return { type: SET_LOGGED_IN, loggedIn };
}

export function setToken(token) {
    return { type: SET_TOKEN, token };
}