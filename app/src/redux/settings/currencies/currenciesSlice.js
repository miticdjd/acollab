import { createSlice } from "@reduxjs/toolkit";

const currenciesSlice = createSlice({
    name: 'currencies',
    initialState: {
        currenciesList: [],
        currenciesMeta: {},
        isSubmitting: false,
        loadingDetails: false,
        loadingList: false,
        errors: {}
    },
    reducers: {
        fetchCurrenciesList: () => {},
        addCurrency: () => {},
        editCurrency: () => {},
        deleteCurrency: () => {},
        refreshErrors: () => {},
        setCurrenciesData: (state, action) => ({...state, ...action.payload})
    }
})

export const { 
    fetchCurrenciesList,
    addCurrency,
    editCurrency,
    deleteCurrency,
    refreshErrors,
    setCurrenciesData
} = currenciesSlice.actions;
export default currenciesSlice.reducer;