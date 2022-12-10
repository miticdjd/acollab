import { createSlice } from "@reduxjs/toolkit";

const issuesSlice = createSlice({
    name: 'issues',
    initialState: {
        issuesStatuses: [],
        issuesTypes: [],
        issuesList: [],
        allIssues: [],
        allIssuesByProject: [],
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
        fetchAllIssuesByProject: () => {},
        addIssue: () => {},
        editIssue: () => {},
        deleteIssue: () => {},
        refreshErrors: () => {},
        deleteAttachment: () => {},
        setIssuesData: (state, action) => ({...state, ...action.payload})
    }
})

export const { 
    fetchIssuesStatuses,
    fetchIssuesTypes,
    fetchIssuesList,
    fetchAllIssuesList,
    fetchAllIssuesByProject,
    addIssue,
    editIssue, 
    deleteIssue,
    deleteAttachment,
    setIssuesData,
    refreshErrors
} = issuesSlice.actions;
export default issuesSlice.reducer;