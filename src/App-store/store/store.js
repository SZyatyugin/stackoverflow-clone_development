import { configureStore } from "@reduxjs/toolkit";
import {
    tokenReducer,
    answersReducer,
    questionsReducer,
    filterReducer,
    questionReducer,
    answersCommentsReducer,
    questionCommentsReducer,
    usersReducer,
    tagsReducer,
    userReducer,
} from "../reducers";

const store = configureStore({
    reducer: {
        tokenReducer,
        answersReducer,
        questionsReducer,
        questionReducer,
        answersCommentsReducer,
        questionCommentsReducer,
        filterReducer,
        usersReducer,
        tagsReducer,
        userReducer,
    },
});
export default store;
