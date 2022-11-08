import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {},
        permissions: [],
        loadingDetails: false,
        isAuthenticated: process.env.REACT_APP_AUTHENTICATED || false, // false is default value
        errors: {}
    },
    reducers: {
        login: () => {},
        logout: () => {},
        forgotPassword: () => {},
        resetPassword: () => {},
        setAuthData: (state, action) => ({...state, ...action.payload})
    }
})

export const { login, logout, forgotPassword, resetPassword, setAuthData } = authSlice.actions;
export default authSlice.reducer;