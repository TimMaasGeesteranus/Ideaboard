import {usersReducer} from "../reducers/usersReducer";
import {ideasReducer} from "../reducers/ideasReducer";
import {boardReducer} from "../reducers/boardReducer";
import {
    alertConstants,
    boardConstants,
    commentConstants,
    ideaConstants,
    ideasConstants,
    userConstants
} from '../constants/constants';
import {authenticationReducer} from '../reducers/authenticationReducer'
import {registrationReducer} from '../reducers/registrationReducer'
import {alertReducer} from "../reducers/alertReducer";
import {commentReducer} from "../reducers/commentReducer";
import {ideaReducer} from "../reducers/ideaReducer";

import expect from 'expect';

describe('users reducer', () => {
    const initialState = {user: {}};
    it('should return the initial state', () => {
        expect(usersReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle GET_REQUEST', () => {
        const requestAction = {
            type: userConstants.GET_REQUEST
        };
        const expectedState = {loading: true};
        expect(usersReducer({}, requestAction)).toEqual(expectedState);
    });

    it('should handle GET_SUCCESS', () => {
        const dataTekst = 'succes';
        const succesAction = {
            type: userConstants.GET_SUCCESS,
            data: dataTekst
        };
        const expectedState = {user: dataTekst};
        expect(usersReducer({}, succesAction)).toEqual(expectedState);
    });

    it('should handle GET_FAILURE', () => {
        const foutmelding = 'foutmelding';
        const failureAction = {
            type: userConstants.GET_FAILURE,
            error: foutmelding
        };
        const expectedState = {
            error: foutmelding
        };
        expect(usersReducer({}, failureAction)).toEqual(expectedState);
    });
});

describe('ideas reducer', () => {
    const initialState = {newIdea: false};
    it('should return the initial state', () => {
        expect(ideasReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle GET_REQUEST', () => {
        const requestAction = {
            type: ideasConstants.GET_ALL_REQUEST
        };
        const expectedState = {loading: true};
        expect(ideasReducer({}, requestAction)).toEqual(expectedState);
    });

    it('should handle GET_SUCCESS', () => {
        const dataTekst = 'blablabla';
        const succesAction = {
            type: ideasConstants.GET_ALL_SUCCESS,
            data: dataTekst
        };
        const expectedState = {ideas: dataTekst};
        expect(ideasReducer({}, succesAction)).toEqual(expectedState);
    });

    it('should handle GET_FAILURE', () => {
        const foutmelding = 'foutmelding';
        const failureAction = {
            type: ideasConstants.GET_ALL_FAILURE,
            error: foutmelding
        };
        const expectedState = {
            error: foutmelding
        };
        expect(ideasReducer({}, failureAction)).toEqual(expectedState);
    });
});

describe('board reducer', () => {
    const initialState = {boardNameIsLoaded: false};
    it('should return the initial state', () => {
        expect(boardReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle INSERT_BOARD_NAME_IN_STORE', () => {
        const boardName = 'BoardName';
        const insertAction = {
            type: boardConstants.INSERT_BOARD_NAME_IN_STORE,
            boardName: boardName
        };
        const expectedState = {};
        expect(boardReducer({}, insertAction)).toEqual(expectedState);
    });
});


describe('authentication reducer', () => {
    // const boardName = 'ideaBoard';
    const initialState = {
        username: "",
        password: "",
        rememberMe: false,
        loggedIn: false,
        showLoginNotification: false,
        submitted: false,
        items: [],
        alert: null
    };
    it('should return the initial state', () => {
        expect(authenticationReducer(undefined, {})).toEqual(initialState);
    });


    it('should handle LOGIN_SUCCESS', () => {
        const successAction = {
            type: userConstants.LOGIN_SUCCESS,
        };
        const expectedState = {
            loggedIn: true,
            password: "",
            showLoginNotification: true
        };
        expect(authenticationReducer({}, successAction)).toEqual(expectedState);
    });

    it('should handle LOGIN_FAILURE', () => {
        const errorMessage = 'Error message';
        const failureAction = {
            type: userConstants.LOGIN_FAILURE,
            error: errorMessage,
        };
        const expectedState = {
            alert: JSON.stringify(errorMessage),
            submitted: true
        };
        expect(authenticationReducer({}, failureAction)).toEqual(expectedState);
    });

    it('should handle USERNAME_CHANGED_AT_LOGIN', () => {
        const username = "coati";
        const usernameChangeAction = {
            type: userConstants.USERNAME_CHANGED_AT_LOGIN,
            username: username,
        };
        const expectedState = {
            username: username,
        };
        expect(authenticationReducer({}, usernameChangeAction)).toEqual(expectedState);
    });

    it('should handle CONFIRM_SUCCESSFUL_LOGIN_AT_NOTIFICATION_ON_CONTENT_PAGE', () => {
        const showLoginNotification = false;
        const confirmSuccessfulLoginAction = {
            type: userConstants.CONFIRM_SUCCESSFUL_LOGIN_AT_NOTIFICATION_ON_CONTENT_PAGE,
            showLoginNotification: showLoginNotification,
        };
        const expectedState = {
            showLoginNotification: !showLoginNotification,
        };
        expect(authenticationReducer({}, confirmSuccessfulLoginAction)).toEqual(expectedState);
    });
});

describe('registration reducer', () => {
    const initialState = {};
    it('should return the initial state', () => {
        expect(registrationReducer(undefined, {})).toEqual(initialState);
    });


    it('should handle GET_REQUEST', () => {
        const registerRequestAction = {
            type: userConstants.REGISTER_REQUEST
        };
        const expectedState = {registering: true};
        expect(registrationReducer({}, registerRequestAction)).toEqual(expectedState);
    });

    it('should handle REGISTER_SUCCESS', () => {
        const registerSuccessAction = {
            type: userConstants.REGISTER_SUCCESS,
        };
        const expectedState = {};
        expect(registrationReducer({}, registerSuccessAction)).toEqual(expectedState);
    });

    it('should handle REGISTER_FAILURE', () => {
        const errorMessage = 'foutmelding';
        const failureAction = {
            type: userConstants.REGISTER_FAILURE,
            error: errorMessage,
        };
        const expectedState = {
            error: errorMessage
        };
        expect(registrationReducer({}, failureAction)).toEqual(expectedState);
    });
});

describe('alert reducer', () => {

    const initialState = {};
    it('should return the initial state', () => {
        expect(alertReducer(undefined, {})).toEqual(initialState);
    });


    it('should handle alert SUCCESS', () => {
        const message = 'bericht';
        const alertSuccessAction = {
            type: alertConstants.SUCCESS,
            message: message,
        };
        const expectedState = {type: 'is-success', message: message};
        expect(alertReducer({}, alertSuccessAction)).toEqual(expectedState);
    });

    it('should handle alert ERROR', () => {
        const message = 'bericht';
        const alertErrorAction = {
            type: alertConstants.ERROR,
            message: message,
        };
        const expectedState = {
            type: 'is-danger',
            message: message
        };
        expect(alertReducer({}, alertErrorAction)).toEqual(expectedState);
    });

    it('should handle alert CLEAR', () => {
        const message = 'bericht';
        const alertClearAction = {
            type: alertConstants.CLEAR,
        };
        const expectedState = {
        };
        expect(alertReducer({}, alertClearAction)).toEqual(expectedState);
    });
});

describe('idea reducer', () => {
    const initialState = {idea: {}};
    it('should return the initial state', () => {
        expect(ideaReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle GET_REQUEST', () => {
        const requestAction = {
            type: ideaConstants.GET_REQUEST
        };
        const expectedState = {loading: true};
        expect(ideaReducer({}, requestAction)).toEqual(expectedState);
    });

    it('should handle GET_SUCCESS', () => {
        const idea = 'idea';

        const succesAction = {
            type: ideaConstants.GET_SUCCESS,
            data: {idea: idea}
        };
        const expectedState = {idea: idea};
        expect(ideaReducer({}, succesAction)).toEqual(expectedState);
    });

    it('should handle GET_FAILURE', () => {
        const err = 'Error';
        const failureAction = {
            type: ideaConstants.GET_FAILURE,
            error: err
        };
        const expectedState = {
            error: err
        };
        expect(ideaReducer({}, failureAction)).toEqual(expectedState);
    });
});

describe('comment reducer', () => {
    const initialState = {};
    it('should return the initial state', () => {
        expect(commentReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle POST_REQUEST', () => {
        const requestAction = {
            type: commentConstants.POST_REQUEST
        };
        const expectedState = {loading: true};
        expect(commentReducer({}, requestAction)).toEqual(expectedState);
    });

    it('should handle POST_SUCCESS', () => {
        const succesAction = {
            type: commentConstants.POST_SUCCESS
        };
        const expectedState = {};
        expect(commentReducer({}, succesAction)).toEqual(expectedState);
    });

    it('should handle POST_FAILURE', () => {
        const err = 'Error';
        const failureAction = {
            type: commentConstants.POST_FAILURE,
            error: err
        };
        const expectedState = {
            error: err
        };
        expect(commentReducer({}, failureAction)).toEqual(expectedState);
    });
});
