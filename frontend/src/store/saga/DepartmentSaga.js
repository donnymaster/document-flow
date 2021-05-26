import { put, takeEvery, call } from 'redux-saga/effects';
import { 
    FETCH_DEPARTMENTS,
    setPaginationAction,
    setDepartmentsAction
} from 'store/reducers/DepartmentReducer';
import { setLoadingAction } from 'store/reducers/AppReducer';
import { setErrorAction } from 'store/reducers/ErrorRedirectReducer';
import api from 'utils/Api';

function* DepartmentWorker(action) {
    const url = action?.payload ? `departments${action.payload}` : 'departments';
    try {
        yield put(setLoadingAction(true));
        const departments = yield call(api.get, url);
        yield put(setDepartmentsAction(departments.data));
        yield put(setPaginationAction({
            current: departments.meta.current_page,
            pageSize: departments.meta.per_page,
            total: departments.meta.total,
        }));
    } catch (error) {
        yield put(setErrorAction({hasError: true, code: error.code ?? 500}));
    } finally {
        yield put(setLoadingAction(false));
    }
}

export function* DepartmentWatcher() {
    yield takeEvery(FETCH_DEPARTMENTS, DepartmentWorker);
}