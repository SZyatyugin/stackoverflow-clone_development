import { createSlice } from "@reduxjs/toolkit";
import {
    getAllQuestions,
    getQuestionById,
    getCommentsForQuestionById,
} from "../../App-services";
const questionsReducer = createSlice({
    name: "questionsReducer",
    initialState: {
        allQuestions: [],
        question: {},
        comments: [],
    },
    reducers: {},
    extraReducers: {
        [getAllQuestions.fulfilled]: (state, action) => {
            state.allQuestions = action.payload;
        },
        [getQuestionById.fulfilled]: (state, action) => {
            state.question = action.payload;
        },
        [getCommentsForQuestionById.fulfilled]: (state, action) => {
            state.comments = action.payload;
        },
    },
});
export default questionsReducer.reducer;
