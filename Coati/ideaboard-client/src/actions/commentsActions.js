import {commentsConstants} from "../constants/constants";

function requestAction() {
    return {type: commentsConstants.GET_ALL_REQUEST}
}

function successAction(data) {
    return {type: commentsConstants.GET_ALL_SUCCESS, data}
}

function failureAction(error) {
    return {type: commentsConstants.GET_ALL_FAILURE, error}
}

// thunk action creator
export function getAllCommentsOnIdeaIDActionMiddleware(id) {
    // Thunk middleware knows how to handle functions.
    // It passes the dispatch method as an argument to the function,
    // thus making it able to dispatch actions itself.
    return (dispatch) => {
        // First dispatch: the app state is updated to inform
        // that the API call is starting.
        dispatch(requestAction());
        // The function called by the thunk middleware can return a value,
        // that is passed on as the return value of the dispatch method.

        // In this case, we return a promise to wait for.
        // This is not required by thunk middleware, but it is convenient for us.

        return fetch(`http://localhost:9000/comments/comments/${id}`, {
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
                dispatch(failureAction(error));
            })
            .then(data => {
                // We can dispatch many times!
                // Here, we update the app state with the results of the API call.
                return dispatch(successAction(data))
            })
    }
}
