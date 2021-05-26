const defaultStore = {
    hasError: false,
    code: null,
};

export const SET_ERROR = 'SET_ERROR';

export const ErrorRedirectReducer = (state = defaultStore, action) => {
    switch (action.type) {
        case SET_ERROR:
            return {...state, ...action.payload };
        default:
            return state;
    }
}

export const setErrorAction = payload => ({type: SET_ERROR, payload});
