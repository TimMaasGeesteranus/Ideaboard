import {ideasConstants} from '../constants/constants';

export function ideasReducer(state = {newIdea: false}, action) {
    let changes;
    switch (action.type) {
        case ideasConstants.GET_ALL_REQUEST:
            changes = {
                loading: true
            };
            return {...state, ...changes};
        case ideasConstants.GET_ALL_SUCCESS:
            changes = {
                ideas: action.data
            };
            return {...state, ...changes};
        case ideasConstants.GET_ALL_FAILURE:
            changes = {
                error: action.error
            };
            return {...state, ...changes};
        case ideasConstants.SET_NEW_IDEA_BOOLEAN_TO_TRUE:
            return {...state, newIdea: !state.newIdea};
        default:
            return state
    }
}
