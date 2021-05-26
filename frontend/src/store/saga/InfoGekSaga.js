
import { put, takeEvery, call } from 'redux-saga/effects';
import { 
    setPaginationAction,
    setInfoGekAction,
    FETCH_INFO_GEK,
} from 'store/reducers/infoGekReducer';
import { setLoadingAction } from 'store/reducers/AppReducer';
import { setErrorAction } from 'store/reducers/ErrorRedirectReducer';
import api from 'utils/Api';

function* InfoGekWorker(action) {
    const url = action?.payload ? `info-gek${action.payload}` : 'info-gek';
    try {
        yield put(setLoadingAction(true));
        const info = yield call(api.get, url);
        yield put(setInfoGekAction(info.data));
        yield put(setPaginationAction({
            current: info.meta.current_page,
            pageSize: info.meta.per_page,
            total: info.meta.total,
        }));
    } catch (error) {
        yield put(setErrorAction({hasError: true, code: error.code ?? 500}));
    } finally {
        yield put(setLoadingAction(false));
    }
}

export function* InfoGekWatcher() {
    yield takeEvery(FETCH_INFO_GEK, InfoGekWorker);
}
