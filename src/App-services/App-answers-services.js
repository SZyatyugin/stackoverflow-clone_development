import { createAsyncThunk } from "@reduxjs/toolkit";

const getAllAnswers = createAsyncThunk(
    "answersReducer/getAllAnswers",
    async () => {
        let url =
            "https://api.stackexchange.com/2.2/answers?order=desc&sort=activity&site=stackoverflow";
        let response = await fetch(url);
        console.log(response);
        return response.json();
    }
);
const getAnswersById = createAsyncThunk(
    "answersReducer/getAnswersById",
    async (id) => {
        let url = `https://api.stackexchange.com/2.2/answers/${id}?order=desc&sort=activity&site=stackoverflow`;
        let response = await fetch(url);
        return response.json();
    }
);
export { getAllAnswers, getAnswersById };
