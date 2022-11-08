import { createSlice } from "@reduxjs/toolkit";

const citiesSlice = createSlice({
    name: 'cities',
    initialState: {
        citiesList: [],
        citiesMeta: {},
        allCities: {},
        isSubmitting: false,
        loadingDetails: false,
        loadingList: false,
        errors: {}
    },
    reducers: {
        fetchCitiesList: () => {},
        fetchAllCitiesList: () => {},
        addCity: () => {},
        editCity: () => {},
        deleteCity: () => {},
        refreshErrors: () => {},
        setCitiesData: (state, action) => ({...state, ...action.payload})
    }
})

export const { 
    fetchCitiesList,
    fetchAllCitiesList,
    addCity,
    editCity,
    deleteCity,
    refreshErrors,
    setCitiesData
} = citiesSlice.actions;
export default citiesSlice.reducer;