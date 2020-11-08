import { alertConstants } from '../constants/constants';

export function alertSuccessAction(message) {
    return { type: alertConstants.SUCCESS, message };
}

export function alertErrorAction(message) {
    return { type: alertConstants.ERROR, message };
}

export function alertClearAction() {
    return { type: alertConstants.CLEAR };
}