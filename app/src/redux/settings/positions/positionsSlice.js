import { createSlice } from "@reduxjs/toolkit";

const positionsSlice = createSlice({
    name: 'positions',
    initialState: {
        positionsList: [],
        positionsMeta: {},
        isSubmitting: false,
        loadingDetails: false,
        loadingList: false,
        errors: {}
    },
    reducers: {
        fetchPositionsList: () => {},
        fetchAllPositionsList: () => {},
        addPosition: () => {},
        editPosition: () => {},
        deletePosition: () => {},
        refreshErrors: () => {},
        setPositionsData: (state, action) => ({...state, ...action.payload})
    }
})

export const { 
    fetchPositionsList,
    fetchAllPositionsList,
    addPosition,
    editPosition,
    deletePosition,
    refreshErrors,
    setPositionsData
} = positionsSlice.actions;
export default positionsSlice.reducer;