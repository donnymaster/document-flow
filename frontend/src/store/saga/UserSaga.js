import { put, takeEvery, call } from 'redux-saga/effects';
import { FETCH_USERS, setUsersAction } from 'store/reducers/UsersReducer';
import { setLoadingAction } from 'store/reducers/AppReducer';
import { setErrorAction } from 'store/reducers/ErrorRedirectReducer';
import api from 'utils/Api';

function* LoadingUsersWorker(action) {
    const url = action?.payload ? `users${action.payload}` : 'users';
    try {
        yield put(setLoadingAction(true));
        const users = yield call(api.get, url);
        yield put(setUsersAction({
            users: users.data,
            pagination: {
                current: users.meta.current_page,
                pageSize: users.meta.per_page,
                total: users.meta.total,
            }
        }));
    } catch (error) {
        yield put(setErrorAction({hasError: true, code: error.code ?? 500}));
    } finally {
        yield put(setLoadingAction(false));
    }
}

export function* UsersWatcher() {
    yield takeEvery(FETCH_USERS, LoadingUsersWorker);
}