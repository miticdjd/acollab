import { createSlice } from "@reduxjs/toolkit";

const sprintsSlice = createSlice({
    name: 'sprints',
    initialState: {
        sprintsList: [],
        allSprints: [],
        sprintsMeta: {},
        isSubmitting: false,
        loadingDetails: false,
        loadingList: false,
        errors: {}
    },
    reducers: {
        fetchSprintsList: () => {},
        fetchAllSprintsList: () => {},
        addSprint: () => {},
        editSprint: () => {},
        deleteSprint: () => {},
        refreshErrors: () => {},
        setSprintsData: (state, action) => ({...state, ...action.payload})
    }
})

export const { 
    fetchSprintsList,
    fetchAllSprintsList,
    addSprint,
    editSprint, 
    deleteSprint,
    setSprintsData,
    refreshErrors
} = sprintsSlice.actions;
export default sprintsSlice.reducer;