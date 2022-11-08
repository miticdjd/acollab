import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        usersList: [],
        allUsers: [],
        usersMeta: {},
        isSubmitting: false,
        loadingDetails: false,
        loadingList: false,
        errors: {}
    },
    reducers: {
        fetchUsersList: () => {},
        fetchAllUsersList: () => {},
        addUser: () => {},
        editUser: () => {},
        deleteUser: () => {},
        refreshErrors: () => {},
        setUsersData: (state, action) => ({...state, ...action.payload})
    }
})

export const { 
    fetchUsersList,
    fetchAllUsersList,
    addUser,
    editUser, 
    deleteUser,
    setUsersData,
    refreshErrors
} = usersSlice.actions;
export default usersSlice.reducer;