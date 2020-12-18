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
            state.loading = "pending";
        },
        [getCommentsForQuestionById.fulfilled]: (state, action) => {
            state.loading = "idle";
            state.comments = action.payload;
        },
        [getCommentsForQuestionById.rejected]: (state, action) => {
            state.loading = "idle";
            state.error = action.payload;
        },
    },
});

export default questionCommentsReducer.reducer;
