import {combineReducers} from 'redux';
import {authenticationReducer} from './authenticationReducer'
import {ideasReducer} from "./ideasReducer";
import {ideaReducer} from "./ideaReducer";
import {commentsReducer} from "./commentsReducer";
import {commentReducer} from "./commentReducer";
import {usersReducer} from "./usersReducer";
import {registrationReducer} from "./registrationReducer";
import {alertReducer} from "./alertReducer";
import {boardReducer} from "./boardReducer";
import {currentIdeasReducer} from "./currentIdeasReducer";
import {paginationReducer} from "./paginationReducer";

export default combineReducers({
    authentication: authenticationReducer,
    registration: registrationReducer,
    alert: alertReducer,
    ideas: ideasReducer,
    idea: ideaReducer,
    comments: commentsReducer,
    comment: commentReducer,
    users: usersReducer,
    board: boardReducer,
    currentIdeas: currentIdeasReducer,
    pagination: paginationReducer
});
