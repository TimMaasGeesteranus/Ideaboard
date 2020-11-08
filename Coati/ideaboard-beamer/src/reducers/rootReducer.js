import {ideasReducer} from "./ideasReducer";
import {boardReducer} from "./boardReducer";
import {carouselReducer} from "./carouselReducer";
import * as Redux from "redux";

export const mainReducer = Redux.combineReducers({
    board: boardReducer,
    ideas: ideasReducer,
    carousel: carouselReducer
});