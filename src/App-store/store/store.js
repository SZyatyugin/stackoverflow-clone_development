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
        tokenReducer: tokenReducer,
        answersReducer: answersReducer,
        questionsReducer: questionsReducer,
        questionReducer: questionReducer,
        answersCommentsReducer: answersCommentsReducer,
        questionCommentsReducer: questionCommentsReducer,
        filterReducer: filterReducer,
        usersReducer: usersReducer,
        tagsReducer: tagsReducer,
        userReducer: userReducer,
    },
});
export default store;
