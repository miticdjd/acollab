import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
    name: 'config',
    initialState: {
        sidebarShow: true,
        sidebarUnfoldable: false
    },
    reducers: {
        setConfig: (state, action) => ({...state, ...action.payload})
    }
})

export const { setConfig } = configSlice.actions;
export default configSlice.reducer;