import { createSlice } from "@reduxjs/toolkit";

const departmentsSlice = createSlice({
    name: 'departments',
    initialState: {
        departmentsList: [],
        departmentsMeta: {},
        allDepartments: [],
        isSubmitting: false,
        loadingDetails: false,
        loadingList: false,
        errors: {}
    },
    reducers: {
        fetchDepartmentsList: () => {},
        fetchAllDepartmentsList: () => {},
        addDepartment: () => {},
        editDepartment: () => {},
        deleteDepartment: () => {},
        refreshErrors: () => {},
        setDepartmentsData: (state, action) => ({...state, ...action.payload})
    }
})

export const { 
    fetchDepartmentsList,
    fetchAllDepartmentsList,
    addDepartment,
    editDepartment,
    deleteDepartment,
    refreshErrors,
    setDepartmentsData
} = departmentsSlice.actions;
export default departmentsSlice.reducer;
