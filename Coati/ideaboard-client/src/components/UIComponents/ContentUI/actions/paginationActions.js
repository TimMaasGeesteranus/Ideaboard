import {paginationConstants} from "../../../../constants/constants";

export function nextAction() {
    return {type: paginationConstants.PAGE_NEXT}
}

export function previousAction() {
    return {type: paginationConstants.PAGE_PREVIOUS}
}

export function resetAction() {
    return {type: paginationConstants.PAGE_RESET}
}

export function setLastPageAction(data) {
    return {type: paginationConstants.PAGE_SET_LAST, data}
}