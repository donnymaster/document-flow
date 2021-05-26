const defaultStore = {
    users: null,
    pagination: null,
};

export const SET_USERS = 'SET_USERS';
export const FETCH_USERS = 'FETCH_USERS';
export const UPDATE_USER = 'UPDATE_USER';

export const UsersReducer = (state = defaultStore, action) => {
    switch (action.type) {
        case SET_USERS:
            return {...state, ...action.payload};
        case UPDATE_USER:
            const oldUser = state.users.filter(user => user.id !== action.payload.id);
            return {...state.users, users: [action.payload, ...oldUser]};
        default:
            return state;
    }
}

export const setUsersAction = payload => ({type: SET_USERS, payload});
export const updateUserAction = payload => ({type: UPDATE_USER, payload});
export const fetchUsersAction = payload => ({type: FETCH_USERS, payload});
