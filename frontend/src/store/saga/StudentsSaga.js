import { put, takeEvery, call } from 'redux-saga/effects';
import { FETCH_STUDENTS, setPaginationAction, setStudentsAction } from 'store/reducers/StudentsReducer';
import { setLoadingAction } from 'store/reducers/AppReducer';
import { setErrorAction } from 'store/reducers/ErrorRedirectReducer';
import api from 'utils/Api';

function* LoadingStudentsWorker(action) {
    const url = action?.payload ? `students${action.payload}` : 'students';
    try {
        yield put(setLoadingAction(true));
        const students = yield call(api.get, url);
        yield put(setStudentsAction(students.data));
        yield put(setPaginationAction({
            current: students.meta.current_page,
            pageSize: students.meta.per_page,
            total: students.meta.total,
        }));
    } catch (error) {
        yield put(setErrorAction({hasError: true, code: error.code ?? 500}));
    } finally {
        yield put(setLoadingAction(false));
    }
}

export function* StudentsWatcher() {
    yield takeEvery(FETCH_STUDENTS, LoadingStudentsWorker);
}