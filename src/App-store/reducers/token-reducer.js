import { createSlice } from "@reduxjs/toolkit";

let tokenReducer = createSlice({
    name: "token",
    initialState: {
        token: null,
    },
    reducers: {},
});

export default tokenReducer.reducer;
