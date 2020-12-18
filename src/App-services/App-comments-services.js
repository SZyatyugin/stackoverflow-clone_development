import { createAsyncThunk } from "@reduxjs/toolkit";
import convertDate from "./convert-date";
let getCommentsForQuestionById = createAsyncThunk(
    "questionCommentsReducer/getCommentsForQuestionById",
    async (id) => {
        let url = `https://api.stackexchange.com/2.2/questions/${id}/comments?order=asc&sort=creation&site=stackoverflow&filter=!9_bDE0E4s`;
        return await fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `Sorry. We've got an error. Response status ${response.status}. It's a bad request`
                    );
                }
                return response.json();
            })
            .then((data) => {
                return data.items.map((elem) => {
                    return commentsResponseTemplate(elem);
                });
            });
    }
);
let getCommentsForAnswersById = createAsyncThunk(
    "answersCommentsReducer/getCommentsForAnswersById",
    async (id) => {
        let url = `https://api.stackexchange.com/2.2/answers/${id}/comments?order=desc&sort=creation&site=stackoverflow&filter=!9_bDE0E4s`;
        return await fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `Sorry. We've got an error. Response status ${response.status}. It's a bad request`
                    );
                }
                return response.json();
            })
            .then((data) => {
                return data.items.map((elem) => {
                    return commentsResponseTemplate(elem);
                });
            });
    }
);
let commentsResponseTemplate = (data) => {
    return {
        body: data.body,
        comment_id: data.comment_id,
        creation_date: convertDate(data.creation_date),
        owner_display_name: data.owner.display_name,
        owner_reputation: data.reputation,
        user_id: data.owner.user_id,
    };
};
export { getCommentsForQuestionById, getCommentsForAnswersById };
