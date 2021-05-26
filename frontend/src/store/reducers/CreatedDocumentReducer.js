const defaultStore = {
    data: null,
    pagination: null,
};

export const SET_CREATED_DOCUMENT = 'SET_CREATED_DOCUMENT';
export const FETCH_CREATED_DOCUMENT = 'FETCH_CREATED_DOCUMENT';
export const SET_PAGINATION = 'SET_PAGINATION';

export const CreatedDocumentReducer = (state = defaultStore, action) => {
    switch (action.type) {
        case SET_CREATED_DOCUMENT:
            return {...state, data: action.payload};
        case SET_PAGINATION:
            return {...state, pagination: action.payload};
        default:
            return state;
    }
}

export const setCreatedDocumentAction = payload => ({type: SET_CREATED_DOCUMENT, payload});
export const setPaginationAction = payload => ({type: SET_PAGINATION, payload});
export const fetchCreatedDocumentAction = payload => ({type: FETCH_CREATED_DOCUMENT, payload});
