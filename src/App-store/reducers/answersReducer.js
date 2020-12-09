import { createSlice } from "@reduxjs/toolkit";
import { getAllAnswers, getAnswersById } from "../actions/index";

const answersReducer = createSlice({
    name: "answersRequest",
    initialState: {
        allAnswers: null,
        answersById: null,
    },
    reducers: {},
    extraReducers: {
        [getAllAnswers.fulfilled]: (state, action) => {
            state.data = action.payload;
        },
        [getAnswersById.fulfilled]: (state, action) => {
            state.answersById = action.payload;
        },
    },
});

export default answersReducer.reducer;
