import { configureStore } from "@reduxjs/toolkit";
import {
    tokenReducer,
    answersReducer,
    questionsReducer,
    filterReducer,
} from "../reducers";

const store = configureStore({
    reducer: {
        tokenReducer: tokenReducer,
        answersReducer: answersReducer,
        questionsReducer: questionsReducer,
        filterReducer: filterReducer,
    },
});
export default store;
