const defaultStore = {
    data: null,
    pagination: null,
};

export const SET_DEPARTMENTS = 'SET_DEPARTMENTS';
export const FETCH_DEPARTMENTS = 'FETCH_DEPARTMENTS';
export const SET_PAGINATION = 'SET_PAGINATION';


export const DepartmentReducer = (state = defaultStore, action) => {
    switch (action.type) {
        case SET_DEPARTMENTS:
            return {...state, data: action.payload};
        case SET_PAGINATION:
            return {...state, pagination: action.payload};
        default:
            return state;
    }
}

export const setDepartmentsAction = payload => ({type: SET_DEPARTMENTS, payload});
export const setPaginationAction = payload => ({type: SET_PAGINATION, payload});
export const fetchDepartmentsAction = payload => ({type: FETCH_DEPARTMENTS, payload});
