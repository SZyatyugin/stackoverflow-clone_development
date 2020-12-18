import { createSlice } from "@reduxjs/toolkit";
import { getAnswersById } from "../../App-services";

const answersReducer = createSlice({
    name: "answersReducer",
    initialState: {
        questionsFetchError: null,
        questionsFetchStatus: "idle",
        answersById: [],
        answersFilters: ["activity", "creation", "votes"],
        answersActiveFilter: "creation",
    },
    reducers: {
        setAnswersActiveFilter: (state, action) => {
            state.answersActiveFilter = action.payload;
        },
    },
    extraReducers: {
        [getAnswersById.pending]: (state) => {
            state.loading = "pending";
        },
        [getAnswersById.fulfilled]: (state, action) => {
            state.loading = "idle";
            state.answersById = action.payload;
        },
        [getAnswersById.rejected]: (state, action) => {
            state.loading = "idle";
            state.error = action.payload;
        },
    },
});
export const { setAnswersActiveFilter } = answersReducer.actions;
export default answersReducer.reducer;
