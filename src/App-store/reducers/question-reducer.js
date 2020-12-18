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
            state.loading = "pending";
        },
        [getQuestionById.fulfilled]: (state, action) => {
            state.loading = "idle";
            state.question = action.payload;
        },
        [getQuestionById.rejected]: (state, action) => {
            state.loading = "idle";
            state.error = action.payload;
        },
    },
});
export default questionReducer.reducer;
