import { createSlice } from "@reduxjs/toolkit";
import {
    getUserById,
    getUserQuestionsById,
    getUserAnswersById,
    getUserPostsById,
    getUserTopTags,
} from "../../App-services";
const userReducer = createSlice({
    name: "userReducer",
    initialState: {
        loading: "idle",
        error: null,
        user: {},
        questions: [],
        answers: [],
        posts: [],
        tags: [],
        activeFilter: "votes",
        filters: ["votes", "creation"],
    },
    reducers: {
        setFilter: (state, actions) => {
            state.activeFilter = actions.payload;
        },
    },
    extraReducers: {
        [getUserById.pending]: (state) => {
            state.loading = "pending";
        },
        [getUserPostsById.pending]: (state) => {
            state.loading = "pending";
        },
        [getUserQuestionsById.pending]: (state) => {
            state.loading = "pending";
        },
        [getUserAnswersById.pending]: (state) => {
            state.loading = "pending";
        },
        [getUserTopTags.pending]: (state) => {
            state.loading = "pending";
        },
        [getUserById.fulfilled]: (state, action) => {
            state.loading = "idle";
            state.user = action.payload;
        },
        [getUserPostsById.fulfilled]: (state, action) => {
            state.loading = "idle";
            state.posts = action.payload;
        },
        [getUserQuestionsById.fulfilled]: (state, action) => {
            state.loading = "idle";
            state.questions = action.payload;
        },
        [getUserAnswersById.fulfilled]: (state, action) => {
            state.loading = "idle";
            state.answers = action.payload;
        },
        [getUserTopTags.fulfilled]: (state, action) => {
            state.loading = "idle";
            state.tags = action.payload;
        },
        [getUserById.rejected]: (state, action) => {
            state.loading = "idle";
            state.error = action.payload;
        },
        [getUserPostsById.rejected]: (state, action) => {
            state.loading = "idle";
            state.error = action.payload;
        },
        [getUserQuestionsById.rejected]: (state, action) => {
            state.loading = "idle";
            state.error = action.payload;
        },
        [getUserAnswersById.rejected]: (state, action) => {
            state.loading = "idle";
            state.error = action.payload;
        },
        [getUserTopTags.rejected]: (state, action) => {
            state.loading = "idle";
            state.error = action.payload;
        },
    },
});
export const { setFilter } = userReducer.actions;
export default userReducer.reducer;
