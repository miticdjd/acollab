import { createSlice } from "@reduxjs/toolkit";

const teamsSlice = createSlice({
    name: 'teams',
    initialState: {
        teamsList: [],
        teamsMeta: {},
        allTeams: [],
        isSubmitting: false,
        loadingDetails: false,
        loadingList: false,
        errors: {}
    },
    reducers: {
        fetchTeamsList: () => {},
        fetchAllTeamsList: () => {},
        addTeam: () => {},
        editTeam: () => {},
        deleteTeam: () => {},
        refreshErrors: () => {},
        setTeamsData: (state, action) => ({...state, ...action.payload})
    }
})

export const { 
    fetchTeamsList,
    fetchAllTeamsList,
    addTeam,
    editTeam,
    deleteTeam,
    refreshErrors,
    setTeamsData
} = teamsSlice.actions;
export default teamsSlice.reducer;
