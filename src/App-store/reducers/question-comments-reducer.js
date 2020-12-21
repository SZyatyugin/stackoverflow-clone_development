import { createSlice } from "@reduxjs/toolkit";
import { getCommentsForQuestionById } from "../../App-services";
const questionCommentsReducer = createSlice({
    name: "questionCommentsReducer",
    initialState: {
        error: null,
        loading: "idle",
        comments: [],
    },
    reducer: {},
    extraReducers: {
        [getCommentsForQuestionById.pending]: (state) => {
            state.loading = "loading";
        },
        [getCommentsForQuestionById.fulfilled]: (state, action) => {
            state.loading = "succeeded";
            state.comments = action.payload;
        },
        [getCommentsForQuestionById.rejected]: (state, action) => {
            state.loading = "failed";
            state.error = action.payload;
        },
    },
});

export default questionCommentsReducer.reducer;
