import qs from "qs";
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
        getToken: (state) => {
            let data = qs.parse(localStorage.getItem("token"));
            state.token = null || data.access_token;
            state.expires = null || data.expires;
        },
        LogOut: (state) => {
            localStorage.removeItem("token");
            state.token = null;
            state.expires = null;
        },
    },
    extraReducers: {
        [finishRegistration.pending]: (state) => {
            state.loading = "loading";
        },
        [getMyAccount.pending]: (state) => {
            state.loading = "loading";
        },
        [finishRegistration.fulfilled]: (state, action) => {
            localStorage.setItem("token", qs.stringify(action.payload));
            state.token = action.payload.access_token;
            state.expires = action.payload.expires;
            state.loading = "succeeded";
        },
        [getMyAccount.fulfilled]: (state, action) => {
            state.loading = "succeeded";
            state.currentUserAccount = action.payload;
        },
        [finishRegistration.rejected]: (state, action) => {
            state.loading = "failed";
            state.error = action.payload;
        },
        [getMyAccount.rejected]: (state, action) => {
            state.loading = "failed";
            state.error = action.payload;
        },
    },
});
export const { getToken, LogOut } = tokenReducer.actions;
export default tokenReducer.reducer;
