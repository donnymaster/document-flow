const defaultStore = {
    data: null,
    pagination: null,
};

export const SET_INFO_GEK = 'SET_INFO_GEK';
export const FETCH_INFO_GEK = 'FETCH_INFO_GEK';
export const SET_PAGINATION = 'SET_PAGINATION';

export const InfoGekReducer = (state = defaultStore, action) => {
    switch (action.type) {
        case SET_INFO_GEK:
            return {...state, data: action.payload};
        case SET_PAGINATION:
            return {...state, pagination: action.payload};
        default:
            return state;
    }
}

export const setInfoGekAction = payload => ({type: SET_INFO_GEK, payload});
export const setPaginationAction = payload => ({type: SET_PAGINATION, payload});
export const fetchInfoGekAction = payload => ({type: FETCH_INFO_GEK, payload});