import { put, takeEvery, call } from 'redux-saga/effects';
import { 
    FETCH_CREATED_DOCUMENT,
    setPaginationAction,
    setCreatedDocumentAction,
} from 'store/reducers/CreatedDocumentReducer';
import { setLoadingAction } from 'store/reducers/AppReducer';
import { setErrorAction } from 'store/reducers/ErrorRedirectReducer';
import api from 'utils/Api';

function* CreatedDocumentWorker(action) {
    const url = action?.payload ? `generated-documents${action.payload}` : 'generated-documents';
    try {
        yield put(setLoadingAction(true));
        const documents = yield call(api.get, url);

        yield put(setCreatedDocumentAction(documents.data));
        yield put(setPaginationAction({
            current: documents.meta.current_page,
            pageSize: documents.meta.per_page,
            total: documents.meta.total,
        }));

    } catch (error) {
        yield put(setErrorAction({hasError: true, code: error.code ?? 500}));
    } finally {
        yield put(setLoadingAction(false));
    }
}

export function* CreatedDocumentWatcher() {
    yield takeEvery(FETCH_CREATED_DOCUMENT, CreatedDocumentWorker);
}