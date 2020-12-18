import { createSlice } from "@reduxjs/toolkit";

const filterReducer = createSlice({
    name: "filterReducer",
    initialState: {
        filters: ["hot", "activity", "votes", "creation", "week", "month"],
        activeFilter: "activity",
        order: "desc",
    },
    reducers: {
        setFilter: (state, action) => {
            state.activeFilter = action.payload;
        },
        setOrder: (state, action) => {
            state.order = action.payload;
        },
    },
});
export const { setFilter, setOrder } = filterReducer.actions;
export default filterReducer.reducer;
