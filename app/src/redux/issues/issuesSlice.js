import { createSlice } from "@reduxjs/toolkit";

const issuesSlice = createSlice({
    name: 'issues',
    initialState: {
        issuesStatuses: [],
        issuesTypes: [],
        issuesList: [],
        allIssues: [],
        issuesMeta: {},
        isSubmitting: false,
        loadingDetails: false,
        loadingList: false,
        errors: {}
    },
    reducers: {
        fetchIssuesStatuses: () => {},
        fetchIssuesTypes: () => {},
        fetchIssuesList: () => {},
        fetchAllIssuesList: () => {},
        addIssue: () => {},
        editIssue: () => {},
        deleteIssue: () => {},
        refreshErrors: () => {},
        setIssuesData: (state, action) => ({...state, ...action.payload})
    }
})

export const { 
    fetchIssuesStatuses,
    fetchIssuesTypes,
    fetchIssuesList,
    fetchAllIssuesList,
    addIssue,
    editIssue, 
    deleteIssue,
    setIssuesData,
    refreshErrors
} = issuesSlice.actions;
export default issuesSlice.reducer;