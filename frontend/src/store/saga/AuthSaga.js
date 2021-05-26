import { put, takeEvery, call } from 'redux-saga/effects';
import { message } from 'antd';
import {
    FETCH_USER,
    FETCH_USER_PERMISSIONS,
    setIsLoginUserAction,
    setIsLoadingBtnAction,
    setUserPermisionsAction,
} from 'store/reducers/AppReducer';
import { setErrorAction } from 'store/reducers/ErrorRedirectReducer';
import { login, getErrorMessage } from 'utils/helpers';
import api from 'utils/Api';

function* LoginWorker(action) {
    try {
        login(yield call(api.post, 'auth/login', action.payload));
        yield put(setIsLoginUserAction(true));
    } catch (error) {
        message.error(getErrorMessage(error));
    } finally {
        yield put(setIsLoadingBtnAction(false));
    }
}

function* PermissionsLoadWorker() {
    try {
        const data = yield call(api.get, 'auth/me');
        yield put(setUserPermisionsAction(data.permissions));
    } catch (error) {
        yield put(setErrorAction({hasError: true, code: error.code ?? 500}));
    }
}

export function* AuthWatcher() {
    yield takeEvery(FETCH_USER, LoginWorker);
    yield takeEvery(FETCH_USER_PERMISSIONS, PermissionsLoadWorker);
}
