import { createSlice } from "@reduxjs/toolkit";

const companyTypesSlice = createSlice({
    name: 'companyTypes',
    initialState: {
        companyTypesList: [],
        companyTypesMeta: {},
        isSubmitting: false,
        loadingDetails: false,
        loadingList: false,
        errors: {}
    },
    reducers: {
        fetchCompanyTypesList: () => {},
        addCompanyType: () => {},
        editCompanyType: () => {},
        deleteCompanyType: () => {},
        refreshErrors: () => {},
        setCompanyTypesData: (state, action) => ({...state, ...action.payload})
    }
})

export const { 
    fetchCompanyTypesList,
    addCompanyType,
    editCompanyType,
    deleteCompanyType,
    refreshErrors,
    setCompanyTypesData
} = companyTypesSlice.actions;
export default companyTypesSlice.reducer;