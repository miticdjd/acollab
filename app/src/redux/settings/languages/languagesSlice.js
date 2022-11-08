import { createSlice } from "@reduxjs/toolkit";

const languagesSlice = createSlice({
    name: 'languages',
    initialState: {
        languagesList: [],
        languagesMeta: {},
        isSubmitting: false,
        loadingDetails: false,
        loadingList: false,
        errors: {}
    },
    reducers: {
        fetchLanguagesList: () => {},
        addLanguage: () => {},
        editLanguage: () => {},
        deleteLanguage: () => {},
        refreshErrors: () => {},
        setLanguagesData: (state, action) => ({...state, ...action.payload})
    }
})

export const { 
    fetchLanguagesList,
    addLanguage,
    editLanguage,
    deleteLanguage,
    refreshErrors,
    setLanguagesData
} = languagesSlice.actions;
export default languagesSlice.reducer;