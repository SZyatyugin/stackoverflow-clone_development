import { createSlice } from "@reduxjs/toolkit";
import { getCommentsForAnswersById } from "../../App-services";
const answersCommentsReducer = createSlice({
    name: "answersCommentsReducer",
    initialState: {
        error: null,
        loading: "idle",
        comments: [],
    },
    reducer: {},
    extraReducers: {
        [getCommentsForAnswersById.pending]: (state) => {
            state.loading = "pending";
        },
        [getCommentsForAnswersById.fulfilled]: (state, action) => {
            state.loading = "pending";
            state.comments = action.payload;
        },
        [getCommentsForAnswersById.rejected]: (state, action) => {
            state.loading = "idle";
            state.error = action.payload;
        },
    },
});

export default answersCommentsReducer.reducer;
