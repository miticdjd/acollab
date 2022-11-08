import { createSlice } from "@reduxjs/toolkit";

const companiesSlice = createSlice({
    name: 'companies',
    initialState: {
        companiesList: [],
        companiesMeta: {},
        isSubmitting: false,
        loadingDetails: false,
        loadingList: false,
        errors: {}
    },
    reducers: {
        fetchCompaniesList: () => {},
        addCompany: () => {},
        editCompany: () => {},
        deleteCompany: () => {},
        refreshErrors: () => {},
        setCompaniesData: (state, action) => ({...state, ...action.payload})
    }
})

export const { 
    fetchCompaniesList,
    addCompany,
    editCompany,
    deleteCompany,
    refreshErrors,
    setCompaniesData
} = companiesSlice.actions;
export default companiesSlice.reducer;