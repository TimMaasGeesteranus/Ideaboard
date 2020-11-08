import history from '../history'
import {userConstants} from "../constants/constants";
import {alertErrorAction, alertSuccessAction} from "./alertActions"


export function saveCurrentUser(data) {
    return {type: userConstants.SAVE_CURRENT_USER, data}
}

//These actions handle input of the login form
export function usernameChangeAction(username) {
    return {type: userConstants.USERNAME_CHANGED_AT_LOGIN, username}
}

export function passwordChangeAction(password) {
    return {type: userConstants.PASSWORD_CHANGED_AT_LOGIN, password}
}

//This action is called when the login has been handled successfully
function successfulLoginAction() {
    return {type: userConstants.LOGIN_SUCCESS}
}

//This action is called by 'loginActionMiddleware' when the login has been handled unsuccessfully
function failedLoginAction(error) {
    return {type: userConstants.LOGIN_FAILURE, error}
}

//This action is called by the close button in 'ContentUI' on the successful login message
export function confirmSuccessfulLoginAction() {
    return {type: userConstants.CONFIRM_SUCCESSFUL_LOGIN_AT_NOTIFICATION_ON_CONTENT_PAGE}
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}

export function loginToServerWithoutFurtherHandling(username, password) {

    return async function (dispatch) {

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password})
        };

        try {
            const response = await fetch(`http://localhost:9000/users/signin`, requestOptions);

            if (!response.ok) {
                logout();
                //window.location.reload(true);
                const error = await response.json();
                dispatch(failedLoginAction(error.error));
            } else {

                let user = await response.json();
                sessionStorage.setItem('user', user.id);
                sessionStorage.setItem('token', JSON.stringify(user.token));
                sessionStorage.setItem('username', user.username);
                history.push('/');
                dispatch(successfulLoginAction());
                // dispatch(success());
            }
        } catch (err) {
            dispatch(failedLoginAction(err.message));
        }
    }
}

export function logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
    return {type: userConstants.LOGOUT}
}

function registerUser(user) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    };

    return fetch(`http://localhost:9000/users/register`, requestOptions).then(handleResponse);
}

export function register(user) {
    return dispatch => {
        dispatch(registerRequestAction(user));

        registerUser(user)
            .then(
                user => {
                    dispatch(registerSuccessAction());
                    history.push('/login');
                    dispatch(alertSuccessAction('Registratie is geslaagd'));

                },
                error => {
                    dispatch(registerFailureAction(error));
                    dispatch(alertErrorAction(error));
                }
            );
    };

    function registerRequestAction() {
        return {type: userConstants.REGISTER_REQUEST}
    }

    function registerSuccessAction(user) {
        return {type: userConstants.REGISTER_SUCCESS, user}
    }

    function registerFailureAction(error) {
        return {type: userConstants.REGISTER_FAILURE, error}
    }
}

// thunk action creator
export function getUserOnIDActionMiddleware(id) {
    // Thunk middleware knows how to handle functions.
    // It passes the dispatch method as an argument to the function,
    // thus making it able to dispatch actions itself.
    return (dispatch) => {
        // First dispatch: the app state is updated to inform
        // that the API call is starting.
        dispatch(request());
        // The function called by the thunk middleware can return a value,
        // that is passed on as the return value of the dispatch method.

        // In this case, we return a promise to wait for.
        // This is not required by thunk middleware, but it is convenient for us.

        return fetch(`http://localhost:9000/users/user/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(res => res.json(),
            // Do not use catch, because that will also catch
            // any errors in the dispatch and resulting render,
            // causing a loop of 'Unexpected batch number' errors.
            // https://github.com/facebook/react/issues/6895
            error => {
                dispatch(failure(error));
            })
            .then(data => {
                // We can dispatch many times!
                // Here, we update the app state with the results of the API call.
                return dispatch(success(data))
            })
    };

    function request() {
        return {type: userConstants.GET_REQUEST}
    }

    function success(data) {
        return {type: userConstants.GET_SUCCESS, data}
    }

    function failure(error) {
        return {type: userConstants.GET_FAILURE, error}
    }
}

// thunk action creator
export function getUserIdeasOnIDActionMiddleware(id) {
    // Thunk middleware knows how to handle functions.
    // It passes the dispatch method as an argument to the function,
    // thus making it able to dispatch actions itself.
    return (dispatch) => {
        // First dispatch: the app state is updated to inform
        // that the API call is starting.
        dispatch(request());
        // The function called by the thunk middleware can return a value,
        // that is passed on as the return value of the dispatch method.

        // In this case, we return a promise to wait for.
        // This is not required by thunk middleware, but it is convenient for us.

        return fetch(`http://localhost:9000/ideas/ideasPerUser/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(res => res.json(),
            // Do not use catch, because that will also catch
            // any errors in the dispatch and resulting render,
            // causing a loop of 'Unexpected batch number' errors.
            // https://github.com/facebook/react/issues/6895
            error => {
                dispatch(failure(error));
            })
            .then(data => {
                // We can dispatch many times!
                // Here, we update the app state with the results of the API call.
                return dispatch(success(data))
            })
    };

    function request() {
        return {type: userConstants.GETIDEASPERUSER_REQUEST}
    }

    function success(data) {
        return {type: userConstants.GETIDEASPERUSER_SUCCESS, data}
    }

    function failure(error) {
        return {type: userConstants.GETIDEASPERUSER_FAILURE, error}
    }
}



