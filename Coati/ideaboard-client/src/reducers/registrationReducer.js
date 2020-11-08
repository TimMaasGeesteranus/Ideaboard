import {userConstants} from "../constants/constants";

export function registrationReducer(state = {}, action) {
    let changes;
    switch (action.type) {
        case userConstants.REGISTER_REQUEST:
            return {...state, registering: true };
        case userConstants.REGISTER_SUCCESS:
            return {...state};
        case userConstants.REGISTER_FAILURE:
            changes ={
                error: action.error
            };
            return {...state, ...changes};
        default:
            return state
    }
}
