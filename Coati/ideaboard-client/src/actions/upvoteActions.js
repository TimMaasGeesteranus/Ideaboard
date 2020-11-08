import {fingerprintConstants, upvoteConstants} from "../constants/constants";

function requestAction() {
    return {type: upvoteConstants.POST_REQUEST}
}

function successAction(data) {
    return {type: upvoteConstants.POST_SUCCESS}
}

function failureAction(error) {
    return {type: upvoteConstants.POST_FAILURE, error}
}

// thunk action creator
export function upVoteActionMiddleware(id, boardName) {
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

        return fetch('http://localhost:9000/ideas/upvote', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                _id: id,
                boardName: boardName
            })
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
                return dispatch(successAction())
            })
    }
}

function requestFingerprintAction() {
    return {type: fingerprintConstants.POST_REQUEST}
}

function successFingerprintAction() {
    return {type: fingerprintConstants.POST_SUCCESS}
}

function failureFingerprintAction(error) {
    return {type: fingerprintConstants.POST_FAILURE, error}
}


export function fingerprintMiddleware(boardId, ideaId, fingerprint) {
    return (dispatch) => {
        // First dispatch: the app state is updated to inform
        // that the API call is starting.
        dispatch(requestFingerprintAction());
        // The function called by the thunk middleware can return a value,
        // that is passed on as the return value of the dispatch method.

        // In this case, we return a promise to wait for.
        // This is not required by thunk middleware, but it is convenient for us.
        return fetch('http://localhost:9000/ideas/fingerprint', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                boardId: boardId,
                ideaId: ideaId,
                fingerprint: fingerprint
            })
        }).then(res => res.json(),
            // Do not use catch, because that will also catch
            // any errors in the dispatch and resulting render,
            // causing a loop of 'Unexpected batch number' errors.
            // https://github.com/facebook/react/issues/6895
            error => {
                dispatch(failureFingerprintAction(error));
            })
            .then(data => {
                // We can dispatch many times!
                // Here, we update the app state with the results of the API call.
                return dispatch(successFingerprintAction())
            })
    }
}
