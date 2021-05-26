const defaultStore = {
    data: null,
    pagination: null,
};

export const FETCH_DOCUMENT_TEMPLATE = 'FETCH_DOCUMENT_TEMPLATE';
export const SET_DOCUMENT_TEMPLATE = 'SET_DOCUMENT_TEMPLATE';
export const SET_PAGIMATION_DOCUMENT_TEMPLATE = 'SET_PAGIMATION_DOCUMENT_TEMPLATE';

export const DocumentTemplateReducer = (state = defaultStore, action) => {
    switch (action.type) {
        case SET_DOCUMENT_TEMPLATE:
            return {...state, data: action.payload};
        case SET_PAGIMATION_DOCUMENT_TEMPLATE:
            return {...state, pagination: action.payload};
        default:
            return state;
    }
}

export const fetchDocumentTemplateAction = payload => ({type: FETCH_DOCUMENT_TEMPLATE, payload});
export const setDocumentTemplateAction = payload => ({type: SET_DOCUMENT_TEMPLATE, payload});
export const setPaginationDocumentTemplate = payload => ({type: SET_PAGIMATION_DOCUMENT_TEMPLATE, payload});
