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
            state.loading = "loading";
        },
        [getAllQuestions.fulfilled]: (state, action) => {
            state.loading = "succeeded";
            state.allQuestions = action.payload;
        },
        [getAllQuestions.rejected]: (state, action) => {
            state.loading = "failed";
            state.error = action.payload;
        },
        [getQuestionsByTags.pending]: (state) => {
            state.loading = "loading";
        },
        [getQuestionsByTags.fulfilled]: (state, action) => {
            state.loading = "succeeded";
            state.allQuestions = action.payload;
        },
        [getQuestionsByTags.rejected]: (state, action) => {
            state.loading = "failed";
            state.error = action.payload;
        },
        [getQuestionsBySearch.pending]: (state) => {
            state.loading = "loading";
        },
        [getQuestionsBySearch.fulfilled]: (state, action) => {
            state.loading = "succeeded";
            state.allQuestions = action.payload;
        },
        [getQuestionsBySearch.rejected]: (state, action) => {
            state.loading = "failed";
            state.error = action.payload;
        },
    },
});
export default questionsReducer.reducer;
