import { createSlice } from "@reduxjs/toolkit";

const issuesSlice = createSlice({
    name: 'issues',
    initialState: {
        issuesList: [],
        allIssues: [],
        issuesMeta: {},
        isSubmitting: false,
        loadingDetails: false,
        loadingList: false,
        errors: {}
    },
    reducers: {
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
    fetchIssuesList,
    fetchAllIssuesList,
    addIssue,
    editIssue, 
    deleteIssue,
    setIssuesData,
    refreshErrors
} = issuesSlice.actions;
export default issuesSlice.reducer;