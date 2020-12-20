import { createSlice } from "@reduxjs/toolkit";
import { finishRegistration, getMyAccount } from "../../App-services";
let tokenReducer = createSlice({
    name: "tokenReducer",
    initialState: {
        client_id: 19244,
        token: null,
        expires: null,
        loading: "idle",
        error: null,
        currentUserAccount: {},
    },
    reducers: {
        getToken: (state, action) => {
            state.token = action.payload.access_token;
            state.expires = action.payload.expires;
        },
        LogOut: (state) => {
            state.token = null;
            state.expires = null;
        },
    },
    extraReducers: {
        [finishRegistration.pending]: (state) => {
            state.loading = "pending";
        },
        [getMyAccount.pending]: (state) => {
            state.loading = "pending";
        },
        [finishRegistration.fulfilled]: (state, action) => {
            state.token = action.payload.access_token;
            state.expires = action.payload.expires;
            state.loading = "idle";
        },
        [getMyAccount.fulfilled]: (state, action) => {
            state.loading = "idle";
            state.currentUserAccount = action.payload;
        },
        [finishRegistration.rejected]: (state, action) => {
            state.loading = "idle";
            state.error = action.payload;
        },
        [getMyAccount.rejected]: (state, action) => {
            state.loading = "idle";
            state.error = action.payload;
        },
    },
});
export const { getToken, LogOut } = tokenReducer.actions;
export default tokenReducer.reducer;
