import {boardConstants} from "../../../../constants/constants";
import {getIdeasActionMiddleware} from "../../../../actions/ideasActions";


function requestAction() {
    return {type: boardConstants.GET_REQUEST}
}

export function saveBoardNameInReduxAction(data) {
    return {type: boardConstants.GET_SUCCESS, data}
}

function failureAction(error) {
    return {type: boardConstants.GET_FAILURE, error}
}

// thunk action creator
export function getBoardNameActionMiddleware() {

    return async function (dispatch) {

        dispatch(requestAction());

        const response = await fetch(`http://localhost:9000/ideas/boardName`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });

        const resultFromResponse = await response.json();

        if (resultFromResponse.error) {
            dispatch(failureAction(resultFromResponse.error));
        } else {
            dispatch(getIdeasActionMiddleware(resultFromResponse));
            dispatch(saveBoardNameInReduxAction(resultFromResponse));
        }

    }
}


