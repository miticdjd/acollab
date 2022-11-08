import { createSlice } from "@reduxjs/toolkit";

const generalSlice = createSlice({
    name: 'general',
    initialState: {
        general: {
            name: '',
            tax: ''
        },
        isSubmitting: false,
        loadingDetails: false,
        loadingList: false,
        errors: {}
    },
    reducers: {
        fetchSettings: () => {},
        refreshErrors: () => {},
        settingsUpdate: () => {},
        setSettingsData: (state, action) => ({...state, ...action.payload})
    }
})

export const { 
    setSettingsData,
    fetchSettings,
    refreshErrors,
    settingsUpdate
} = generalSlice.actions;
export default generalSlice.reducer;