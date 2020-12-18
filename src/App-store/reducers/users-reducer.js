import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers } from "../../App-services";
const usersReducer = createSlice({
    name: "usersReducer",
    initialState: {
        error: null,
        loading: "idle",
        users: [],
        filters: ["reputation", "creation", "name", "modified"],
        activeFilter: "reputation",
        order: "desc",
        tagsLoading: "idle",
    },
    reducers: {
        setUsersPageFilter: (state, action) => {
            state.activeFilter = action.payload;
        },
        setUsersPageOrder: (state, action) => {
            state.order = action.payload;
        },
    },
    extraReducers: {
        [getAllUsers.pending]: (state) => {
            state.loading = "pending";
        },
        [getAllUsers.fulfilled]: (state, action) => {
            state.loading = "idle";
            state.users = action.payload;
        },
        [getAllUsers.rejected]: (state, action) => {
            state.loading = "idle";
            state.error = action.payload;
        },
    },
});
export const { setUsersPageFilter, setUsersPageOrder } = usersReducer.actions;
export default usersReducer.reducer;
