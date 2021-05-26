const defaultStore = {
    data: null,
    pagination: null,
};

export const SET_STUDENTS = 'SET_STUDENTS';
export const FETCH_STUDENTS = 'FETCH_STUDENTS';
export const SET_PAGINATION = 'SET_PAGINATION';

export const StudentsReducer = (state = defaultStore, action) => {
    switch (action.type) {
        case SET_STUDENTS:
            return {...state, data: action.payload};
        case SET_PAGINATION:
            return {...state.users, pagination: action.payload};
        default:
            return state;
    }
}

export const setStudentsAction = payload => ({type: SET_STUDENTS, payload});
export const setPaginationAction = payload => ({type: SET_PAGINATION, payload});
export const fetchStudentsAction = payload => ({type: FETCH_STUDENTS, payload});
