import { put, takeEvery, call } from 'redux-saga/effects';
import { 
    setDocumentTemplateAction,
    setPaginationDocumentTemplate,
    FETCH_DOCUMENT_TEMPLATE,
} from 'store/reducers/DocumentTemplateReducer';
import { setLoadingAction } from 'store/reducers/AppReducer';
import { setErrorAction } from 'store/reducers/ErrorRedirectReducer';
import api from 'utils/Api';

function* DocumentTemplateWorker(action) {
    const url = action?.payload ? `document-templates${action.payload}` : 'document-templates';
    try {
        yield put(setLoadingAction(true));
        const templates = yield call(api.get, url);
        yield put(setDocumentTemplateAction(templates.data));
        yield put(setPaginationDocumentTemplate({
            current: templates.meta.current_page,
            pageSize: templates.meta.per_page,
            total: templates.meta.total,
        }));
    } catch (error) {
        yield put(setErrorAction({hasError: true, code: error.code ?? 500}));
    } finally {
        yield put(setLoadingAction(false));
    }
}

export function* DocumentTemplateWatcher() {
    yield takeEvery(FETCH_DOCUMENT_TEMPLATE, DocumentTemplateWorker);
}