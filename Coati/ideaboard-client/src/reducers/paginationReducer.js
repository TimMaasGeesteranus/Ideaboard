import {paginationConstants} from "../constants/constants";

const initialState = {
    currentPage: 1,
    numberOfItemsPerPage: 5,
    lastPage: 5
};

export function paginationReducer(state = initialState, action) {
    let changes;
    switch(action.type) {
        case paginationConstants.PAGE_NEXT:
            let newCurrentPage;
            if (state.currentPage !== state.lastPage) {
                newCurrentPage = state.currentPage + 1
            }
            changes = {
                currentPage: newCurrentPage
            };
            return {...state, ...changes};
        case paginationConstants.PAGE_PREVIOUS:
            changes = {
                currentPage: state.currentPage - 1
            };
            return {...state, ...changes};
        case paginationConstants.PAGE_RESET:
            changes = {
                currentPage: 1
            };
            return {...state, ...changes};
        case paginationConstants.PAGE_SET_LAST:
            changes = {
                lastPage: action.data
            };
            return {...state, ...changes};
        default:
            return state;
    }
}