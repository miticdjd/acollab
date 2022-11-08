import { createSlice } from "@reduxjs/toolkit";

const rolesSlice = createSlice({
    name: 'roles',
    initialState: {
        rolesList: [],
        rolesMeta: {},
        isSubmitting: false,
        loadingDetails: false,
        loadingList: false,
        errors: {}
    },
    reducers: {
        fetchRolesList: () => {},
        addRole: () => {},
        editRole: () => {},
        deleteRole: () => {},
        refreshErrors: () => {},
        setRolesData: (state, action) => ({...state, ...action.payload})
    }
})

export const { 
    fetchRolesList,
    addRole,
    editRole, 
    deleteRole,
    setRolesData,
    refreshErrors
} = rolesSlice.actions;
export default rolesSlice.reducer;