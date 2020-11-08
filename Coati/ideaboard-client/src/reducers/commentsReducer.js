import {commentsConstants} from '../constants/constants';

let initialState = {
    comments: {}
};

export function commentsReducer(state = initialState, action) {
    let changes;
    switch (action.type) {
        case commentsConstants.GET_ALL_REQUEST:
            changes = {
                loading: true
            };
            return {...state, ...changes};
        case commentsConstants.GET_ALL_SUCCESS:
            changes = {
                comments: action.data
            };
            return {...state, ...changes};
        case commentsConstants.GET_ALL_FAILURE:
            changes ={
                error: action.error
            };
            return {...state, ...changes};
        default:
            return state
    }
}
