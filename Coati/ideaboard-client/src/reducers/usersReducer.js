import {userConstants} from '../constants/constants';

const initialState = {
    user: {}
};

export function usersReducer(state = initialState, action) {
    let changes;
    switch (action.type) {
        case userConstants.GET_REQUEST:
            changes = {
                loading: true
            };
            return {...state, ...changes};
        case userConstants.GET_SUCCESS:
            changes = {
                user: action.data,
            };
            return {...state, ...changes};
        case userConstants.GET_FAILURE:
            changes ={
                error: action.error
            };
            return {...state, ...changes};
        case userConstants.GETIDEASPERUSER_REQUEST:
            changes ={
                loading: true
            };
            return {...state, ...changes};
        case userConstants.GETIDEASPERUSER_SUCCESS:
            changes ={
                userIdeas: action.data
            };
            return {...state, ...changes};
        case userConstants.GETIDEASPERUSER_FAILURE:
            changes ={
                error: action.error
            };
            return {...state, ...changes};
        case userConstants.SAVE_CURRENT_USER:
            changes ={
                currentUser: action.data
            };
            return {...state, ...changes};
        default:
            return state
    }
}
