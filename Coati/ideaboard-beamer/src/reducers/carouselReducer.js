import {carouselConstants} from "../constants/constants";

const initialState = {
    ideas: null
};

export function carouselReducer(state = initialState, action) {
    let changes;

    switch (action.type) {
        case carouselConstants.GET_REQUEST:
            changes = {
                loading: true
            };
            return {...state, ...changes};
        case carouselConstants.GET_SUCCESS:
            changes = {
                ideas: action.data
            };
            return {...state, ...changes};
        case carouselConstants.GET_FAILURE:
            changes = {
                error: action.error
            };
            return {...state, ...changes};
        default:
            return {...state};
    }
}