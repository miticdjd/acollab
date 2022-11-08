import { createSlice } from "@reduxjs/toolkit";

const countriesSlice = createSlice({
    name: 'countries',
    initialState: {
        countriesList: [],
        countriesMeta: {},
        allCountries: [],
        isSubmitting: false,
        loadingDetails: false,
        loadingList: false,
        errors: {}
    },
    reducers: {
        fetchCountriesList: () => {},
        fetchAllCountriesList: () => {},
        addCountry: () => {},
        editCountry: () => {},
        deleteCountry: () => {},
        refreshErrors: () => {},
        setCountriesData: (state, action) => ({...state, ...action.payload})
    }
})

export const { 
    fetchCountriesList,
    fetchAllCountriesList,
    addCountry,
    editCountry,
    deleteCountry,
    refreshErrors,
    setCountriesData
} = countriesSlice.actions;
export default countriesSlice.reducer;