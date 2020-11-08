import {ideaConstants} from '../constants/constants';

const initialState = {
    idea: {}
};

export function ideaReducer(state = initialState, action) {
    let changes;
    switch (action.type) {
        case ideaConstants.GET_REQUEST:
            changes = {
                loading: true
            };
            return {...state, ...changes};
        case ideaConstants.GET_SUCCESS:
            changes = {
                idea: action.data.idea
            };
            return {...state, ...changes};
        case ideaConstants.GET_FAILURE:
            changes ={
                error: action.error
            };
            return {...state, ...changes};
        case ideaConstants.SAVE_CURRENT_IDEA:
            changes ={
                currentIdea: action.data
            };
            return {...state, ...changes};
        default:
            return state
    }
}
