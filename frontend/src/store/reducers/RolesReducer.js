const defaultStore = {
    roles: null,
    pagination: null,
};

export const SET_ROLES = 'SET_ROLES';
export const FETCH_ROLES = 'FETCH_ROLES';
export const UPDATE_ROLE = 'UPDATE_ROLE';

export const RolesReducer = (state = defaultStore, action) => {
    switch (action.type) {
        case SET_ROLES:
            return {...state, ...action.payload};
        case UPDATE_ROLE:
            const oldRoles = state.roles.filter(role => role.id !== action.payload.id);
            return {...state.roles, roles: [action.payload, ...oldRoles]};
        default:
            return state;
    }
}

export const setRolesAction = payload => ({type: SET_ROLES, payload});
export const updateRoleAction = payload => ({type: UPDATE_ROLE, payload});
export const fetchRolesAction = payload => ({type: FETCH_ROLES, payload});
