import { createSlice } from "@reduxjs/toolkit";
import { getAllQuestions } from "../actions/index";
const questionsReducer = createSlice({
    name: "questionsReducer",
    initialState: {
        allQuestions: null,
        questionsId: null,
    },
    reducers: {},
    extraReducers: {
        [getAllQuestions.fulfilled]: (state, action) => {
            console.log(action);
            state.allQuestions = action.payload;
        },
    },
});
export default questionsReducer.reducer;
