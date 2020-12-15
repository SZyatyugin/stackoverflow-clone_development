import { createSlice } from "@reduxjs/toolkit";
import { getAnswersById } from "../../App-services";

const answersReducer = createSlice({
    name: "answersRequest",
    initialState: {
        questionsFetchError: null,
        questionsFetchStatus: "idle",
        answersById: [],
    },
    reducers: {},
    extraReducers: {
        [getAnswersById.fulfilled]: (state, action) => {
            state.answersById = action.payload;
        },
    },
});

export default answersReducer.reducer;
