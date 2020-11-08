import {boardConstants} from '../constants/constants';

export function boardReducer(state = {boardNameIsLoaded: false}, action) {
    let changes;
    switch (action.type) {
        case boardConstants.GET_REQUEST:
            changes = {
                loading: true
            };
            return {...state, ...changes};
        case boardConstants.GET_SUCCESS:
            changes = {
                boardName: action.data,
                boardNameIsLoaded: true
            };
            return {...state, ...changes};
        case boardConstants.GET_FAILURE:
            changes ={
                error: action.error
            };
            return {...state, ...changes};
        default:
            return state
    }
}