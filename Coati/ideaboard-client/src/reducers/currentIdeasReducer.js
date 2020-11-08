import {currentIdeasConstants} from '../constants/constants';

const initialState = {
};

export function currentIdeasReducer(state = initialState, action) {
    let changes;
    switch (action.type) {
        case currentIdeasConstants.GET_ALLCURRENT_SUCCESS:
            changes = {
                currentIdeas: action.data
            };
            return {...state, ...changes};
        case currentIdeasConstants.SAVE_SEARCH_TEXT:
            changes = {
                searchText: action.text
            };
            return {...state, ...changes};
        default:
            return state
    }
}
