import {alertConstants} from "../constants/constants";

export function alertReducer(state = {}, action) {
    let changes;
    switch (action.type) {
        case alertConstants.SUCCESS:
            changes = {
                type: 'is-success',
                message: action.message
            };
            return {...state, ...changes};
        case alertConstants.ERROR:
            changes = {
                type: 'is-danger',
                message: action.message
            };
            return {...state, ...changes};
        case alertConstants.CLEAR:
            return {...state, ...changes};
        default:
            return state
    }
}
