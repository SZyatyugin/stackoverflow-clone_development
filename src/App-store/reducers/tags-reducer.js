import { createSlice } from "@reduxjs/toolkit";
import { getAllTags } from "../../App-services";
const tagsReducer = createSlice({
    name: "tagsReducer",
    initialState: {
        error: null,
        loading: "idle",
        tags: [],
        tagsPageFilters: ["popular", "name", "new"],
        activeFilter: "popular",
    },
    reducers: {
        setTagPageFilter: (state, action) => {
            state.activeFilter = action.payload;
        },
    },
    extraReducers: {
        [getAllTags.pending]: (state) => {
            state.loading = "pending";
        },
        [getAllTags.fulfilled]: (state, action) => {
            state.loading = "idle";
            state.tags = action.payload;
        },
        [getAllTags.rejected]: (state, action) => {
            state.loading = "idle";
            state.error = action.payload;
        },
    },
});
export const setTagPageFilter = tagsReducer.actions;
export default tagsReducer.reducer;
