import {currentIdeasConstants} from "../constants/constants";

export function successAction(data) {
    return {type: currentIdeasConstants.GET_ALLCURRENT_SUCCESS, data}
}

export function saveSearchTextAction(text){
    return {type: currentIdeasConstants.SAVE_SEARCH_TEXT, text}
}
