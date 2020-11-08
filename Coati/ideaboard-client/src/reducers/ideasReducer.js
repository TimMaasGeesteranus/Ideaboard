import {ideasConstants} from '../constants/constants';

const initialState = {
    newIdea: false,
};

export function ideasReducer(state = initialState, action) {
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
            changes ={
                error: action.error
            };
            return {...state, ...changes};
        case ideasConstants.SET_NEW_IDEA_BOOLEAN_TO_TRUE:
            let newIdeaBoolean = !state.newIdea;
            changes ={
                newIdea: newIdeaBoolean
            };
            return {...state,...changes};
        default:
            return state
    }
}
