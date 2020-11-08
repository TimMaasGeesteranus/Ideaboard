import {carouselConstants} from "../../../../constants/constants";

function requestAction() {
    return {type: carouselConstants.GET_REQUEST}
}

function successAction(data) {
    return {type: carouselConstants.GET_SUCCESS, data}
}

function failureAction(error) {
    return {type: carouselConstants.GET_FAILURE, error}
}

// thunk action creator
export function getNewestIdeasActionMiddleware(boardName) {
    // Thunk middleware knows how to handle functions.
    // It passes the dispatch method as an argument to the function,
    // thus making it able to dispatch actions itself.
    return async function (dispatch) {
        // First dispatch: the app state is updated to inform
        // that the API call is starting.
        dispatch(requestAction);
        try {
            const topFiveResponse = await fetch(`http://localhost:9000/ideas/top5Newest/${boardName}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });
            dispatch(successAction(await topFiveResponse.json()));
        } catch (err) {
            dispatch(failureAction(err));
        }
    }
}
