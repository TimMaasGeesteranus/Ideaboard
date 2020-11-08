import {userConstants} from "../constants/constants";

// const URL_WITHOUT_ENDPOINT = "http://localhost:3000";

const initialState = {
    username: "",
    password: "",
    rememberMe: false,
    loggedIn: false,
    showLoginNotification: false,
    submitted: false,
    items: [],
    alert: null
};

export function authenticationReducer(state = initialState, action) {
    let changes;

    switch (action.type) {

        case userConstants.LOGIN_SUCCESS:
            changes = {
                loggedIn: true,
                password: "",
                showLoginNotification: true
            };
            return {...state, ...changes};

        case userConstants.LOGIN_FAILURE:
            changes = {
                alert: JSON.stringify(action.error),
                submitted: true
            };
            return {...state, ...changes};
        case userConstants.USERNAME_CHANGED_AT_LOGIN:
            changes = {
                username: action.username
            };
            return {...state, ...changes};

        case userConstants.PASSWORD_CHANGED_AT_LOGIN:
            changes = {
                password: action.password
            };
            return {...state, ...changes};
        case userConstants.CONFIRM_SUCCESSFUL_LOGIN_AT_NOTIFICATION_ON_CONTENT_PAGE:

            return {...state, showLoginNotification: !state.showLoginNotification};

        case userConstants.LOGOUT:
            changes = {loggedIn: false};
            return {...state, ...changes};
        default:
            return state
    }
}
