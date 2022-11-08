import { createSlice } from "@reduxjs/toolkit";

const activitiesSlice = createSlice({
    name: 'activities',
    initialState: {
        eventTypes: [],
        activitiesList: [],
        activitiesMeta: {},
        activityDetails: {},
        isSubmitting: false,
        loadingDetails: true,
        loadingEventTypes: false,
        loadingList: false,
    },
    reducers: {
        fetchEventTypes: () => {},
        fetchActivitiesList: () => {},
        fetchActivityDetails: () => {},
        setActivitiesData: (state, action) => ({...state, ...action.payload})
    }
})

export const { 
    fetchEventTypes,
    fetchActivitiesList,
    fetchActivityDetails,
    setActivitiesData
} = activitiesSlice.actions;
export default activitiesSlice.reducer;