import {boardReducer} from '../reducers/boardReducer';
import {carouselReducer} from '../reducers/carouselReducer';
import {ideasReducer} from "../reducers/ideasReducer";
import {boardConstants, carouselConstants, ideasConstants} from '../constants/constants';

import expect from 'expect';

describe('board reducer', () => {
    const boardName = 'ideaBoard';
    const initialState = {boardNameIsLoaded: false};
    it('should return the initial state', () => {
        expect(boardReducer(undefined, {})).toEqual(initialState);
    });


    it('should handle GET_REQUEST', () => {
        const requestAction = {
            type: boardConstants.GET_REQUEST
        };
        const expectedState = {loading: true};
        expect(boardReducer({}, requestAction)).toEqual(expectedState);
    });

    it('should handle GET_SUCCESS', () => {
        const succesAction = {
            type: boardConstants.GET_SUCCESS,
            data: boardName
        };
        const expectedState = {boardName: boardName, boardNameIsLoaded: true};
        expect(boardReducer({}, succesAction)).toEqual(expectedState);
    });

    it('should handle GET_FAILURE', () => {
        const foutmelding = 'foutmelding';
        const failureAction = {
            type: boardConstants.GET_FAILURE,
            error: foutmelding
        };
        const expectedState = {
            error: foutmelding
        };
        expect(boardReducer({}, failureAction)).toEqual(expectedState);
    });
});

describe('carousel reducer', () => {
    const initialState = {ideas: null};
    it('should return the initial state', () => {
        expect(carouselReducer(undefined, {})).toEqual(initialState);
    });


    it('should handle GET_REQUEST', () => {
        const requestAction = {
            type: carouselConstants.GET_REQUEST
        };
        const expectedState = {loading: true};
        expect(carouselReducer({}, requestAction)).toEqual(expectedState);
    });

    it('should handle GET_SUCCESS', () => {
        const ideas = {'ideas': {
            idea: 'blabla'
        }
    };
        const succesAction = {
            type: carouselConstants.GET_SUCCESS,
            data: ideas
        };
        const expectedState = {ideas};
        expect(carouselReducer({}, succesAction)).toEqual(expectedState);
    });

    it('should handle GET_FAILURE', () => {
        const foutmelding = 'foutmelding';
        const failureAction = {
            type: carouselConstants.GET_FAILURE,
            error: foutmelding
        };
        const expectedState = {
            error: foutmelding
        };
        expect(carouselReducer({}, failureAction)).toEqual(expectedState);
    });
});

describe('ideas reducer', () => {
    const initialState = {newIdea: false};
    it('should return the initial state', () => {
        expect(ideasReducer(undefined, {})).toEqual(initialState);
    });


    it('should handle GET_ALL_REQUEST', () => {
        const requestAction = {
            type: ideasConstants.GET_ALL_REQUEST
        };
        const expectedState = {loading: true};
        expect(ideasReducer({}, requestAction)).toEqual(expectedState);
    });

    it('should handle GET_ALL_SUCCESS', () => {
        const ideas = {'ideas': {
                idea: 'blabla'
            }
        };
        const succesAction = {
            type: ideasConstants.GET_ALL_SUCCESS,
            data: ideas
        };
        const expectedState = {ideas};
        expect(ideasReducer({}, succesAction)).toEqual(expectedState);
    });

    it('should handle GET_ALL_FAILURE', () => {
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

    it('should handle SET_NEW_IDEA_BOOLEAN_TO_TRUE', () => {
        const toddleIdeaAction = {
            type:ideasConstants.SET_NEW_IDEA_BOOLEAN_TO_TRUE
        };
        const expectedState = {
            newIdea: true
        };
        expect(ideasReducer({},toddleIdeaAction)).toEqual(expectedState);
    });
});
