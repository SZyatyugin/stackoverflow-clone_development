import { createSlice } from "@reduxjs/toolkit";
import { getQuestionById } from "../../App-services";
const questionReducer = createSlice({
    name: "questionReducer",
    initialState: {
        error: null,
        loading: "idle",
        question: {},
    },
    reducers: {},
    extraReducers: {
        [getQuestionById.pending]: (state) => {
            state.loading = "loading";
        },
        [getQuestionById.fulfilled]: (state, action) => {
            state.loading = "succeeded";
            state.question = action.payload;
        },
        [getQuestionById.rejected]: (state, action) => {
            state.loading = "failed";
            state.error = action.payload;
        },
    },
});
export default questionReducer.reducer;
