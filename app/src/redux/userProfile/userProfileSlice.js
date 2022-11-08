import { createSlice } from "@reduxjs/toolkit";

const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState: {
        isProfileSubmitting: false,
        isPasswordSubmitting: false,
        resetPasswordForm: false,
        isSubmitting: false,
        errors: {}
    },
    reducers: {
        profileUpdate: () => {},
        passwordUpdate: () => {},
        refreshErrors: () => {},
        setUser: (state, action) => ({...state, ...action.payload})
    }
})

export const { setUser, profileUpdate, passwordUpdate, refreshErrors } = userProfileSlice.actions;
export default userProfileSlice.reducer;