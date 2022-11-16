import { createSlice } from "@reduxjs/toolkit";

const projectsSlice = createSlice({
    name: 'projects',
    initialState: {
        projectsList: [],
        allProjects: [],
        projectsMeta: {},
        isSubmitting: false,
        loadingDetails: false,
        loadingList: false,
        errors: {}
    },
    reducers: {
        fetchProjectsList: () => {},
        fetchAllProjectsList: () => {},
        addProject: () => {},
        editProject: () => {},
        deleteProject: () => {},
        refreshErrors: () => {},
        setProjectsData: (state, action) => ({...state, ...action.payload})
    }
})

export const { 
    fetchProjectsList,
    fetchAllProjectsList,
    addProject,
    editProject, 
    deleteProject,
    setProjectsData,
    refreshErrors
} = projectsSlice.actions;
export default projectsSlice.reducer;