import {commentConstants} from '../constants/constants';

export function commentReducer(state = {}, action) {
    let changes;
    switch (action.type) {
        case commentConstants.POST_REQUEST:
            changes = {
                loading: true
            };
            return {...state, ...changes};
        case commentConstants.POST_SUCCESS:
            changes = {
            };
            return {...state, ...changes};
        case commentConstants.POST_FAILURE:
            changes ={
                error: action.error
            };
            return {...state, ...changes};
        default:
            return state
    }
}