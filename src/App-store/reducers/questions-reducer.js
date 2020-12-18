import { createSlice } from "@reduxjs/toolkit";
import {
    getAllQuestions,
    getQuestionsByTags,
    getQuestionsBySearch,
} from "../../App-services";
const questionsReducer = createSlice({
    name: "questionsReducer",
    initialState: {
        error: null,
        loading: "idle",
        allQuestions: [],
    },
    reducers: {},
    extraReducers: {
        [getAllQuestions.pending]: (state) => {
            state.loading = "pending";
        },
        [getAllQuestions.fulfilled]: (state, action) => {
            state.loading = "idle";
            state.allQuestions = action.payload;
        },
        [getAllQuestions.rejected]: (state, action) => {
            state.loading = "idle";
            state.error = action.payload;
        },
        [getQuestionsByTags.pending]: (state) => {
            state.loading = "pending";
        },
        [getQuestionsByTags.fulfilled]: (state, action) => {
            state.loading = "idle";
            state.allQuestions = action.payload;
        },
        [getQuestionsByTags.rejected]: (state, action) => {
            state.loading = "idle";
            state.error = action.payload;
        },
        [getQuestionsBySearch.pending]: (state) => {
            state.loading = "pending";
        },
        [getQuestionsBySearch.fulfilled]: (state, action) => {
            state.loading = "idle";
            state.allQuestions = action.payload;
        },
        [getQuestionsBySearch.rejected]: (state, action) => {
            state.loading = "idle";
            state.error = action.payload;
        },
    },
});
export default questionsReducer.reducer;
