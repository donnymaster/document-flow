import { put, takeEvery, call } from 'redux-saga/effects';
import { FETCH_ROLES, setRolesAction } from 'store/reducers/RolesReducer';
import { setLoadingAction } from 'store/reducers/AppReducer';
import { setErrorAction } from 'store/reducers/ErrorRedirectReducer';
import api from 'utils/Api';

function* LoadingRolesWorker(action) {
    const url = action?.payload ? `roles${action.payload}` : 'roles';
    try {
        yield put(setLoadingAction(true));
        const roles = yield call(api.get, url);
        yield put(setRolesAction({
            roles: roles.data,
            pagination: {
                current: roles.meta.current_page,
                pageSize: roles.meta.per_page,
                total: roles.meta.total,
            }
        }));
    } catch (error) {
        yield put(setErrorAction({hasError: true, code: error.code ?? 500}));
    } finally {
        yield put(setLoadingAction(false));
    }
}

export function* RolesWatcher() {
    yield takeEvery(FETCH_ROLES, LoadingRolesWorker);
}