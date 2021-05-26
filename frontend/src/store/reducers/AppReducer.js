import storage from 'utils/storage';

const defaultStore = {
    isLoadingBtnLogin: false,
    isLoading: false,
    isLoginUser: !!storage.getItem('token'),
    userPermissions: null,
};

export const SET_LOADING = 'SET_LOADING';
export const SET_IS_LOGIN_USER = 'SET_IS_LOGIN_USER';
export const SET_USER_PERMISSIONS = 'SET_USER_PERMISSIONS';
export const FETCH_USER = 'FETCH_USER';
export const FETCH_USER_PERMISSIONS = 'FETCH_USER_PERMISSIONS';
export const LOGOUT_USER = 'LOGOUT_USER';
export const SET_IS_LOADING_LOGIN = 'SET_IS_LOADING_LOGIN';

const AppReducer = (state = defaultStore, action) => {
    switch (action.type) {
        case SET_LOADING:
            return {...state, isLoading: action.payload};
        case SET_IS_LOGIN_USER:
            return {...state, isLoginUser: action.payload};
        case SET_USER_PERMISSIONS:
            return {...state, userPermissions: action.payload};
        case LOGOUT_USER:
            return {...state, ...action.payload};
        case SET_IS_LOADING_LOGIN:
            return {...state, isLoadingBtnLogin: action.payload};
        default:
            return state;
    }
}

export const setLoadingAction = payload => ({type: SET_LOADING, payload});
export const setIsLoginUserAction = payload => ({type: SET_IS_LOGIN_USER, payload});
export const setUserPermisionsAction = payload => ({type: SET_USER_PERMISSIONS, payload});
export const fetchPermisionsAction = () => ({type: FETCH_USER_PERMISSIONS});
export const fetchUserAction = payload => ({type: FETCH_USER, payload});
export const logoutUserAction = payload => ({type: LOGOUT_USER, payload});
export const setIsLoadingBtnAction = payload => ({type: SET_IS_LOADING_LOGIN, payload});

export default AppReducer;
