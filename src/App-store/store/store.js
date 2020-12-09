import { configureStore } from "@reduxjs/toolkit";
import { tokenReducer, answersReducer, questionsReducer } from "../reducers";

const store = configureStore({
    reducer: {
        tokenReducer: tokenReducer,
        answersReducer: answersReducer,
        questionsReducer: questionsReducer,
    },
});
export default store;
