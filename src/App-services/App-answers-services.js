import { createAsyncThunk } from "@reduxjs/toolkit";
import convertDate from "./convert-date";
const getAnswersById = createAsyncThunk(
    "answersReducer/getAnswersById",
    async (data) => {
        let { id, sort } = data;
        let url = `https://api.stackexchange.com/2.2/questions/${id}/answers?order=desc&sort=${sort}&site=stackoverflow&filter=!9_bDE(fI5`;
        return await fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `Sorry. We've got an error. Response status ${response.status}. It's a bad request`
                    );
                }
                return response.json();
            })
            .then((result) => {
                return result.items.map((elem) => {
                    return answerResponseTemplate(elem);
                });
            });
    }
);
let answerResponseTemplate = (data) => {
    return {
        user_id: data.owner.user_id,
        answer_id: data.answer_id,
        question_id: data.question_id,
        body: data.body,
        is_accepted: data.is_accepted,
        owner_reputation: data.owner.reputation,
        user_profile_image: data.owner.profile_image,
        user_profile_name: data.owner.display_name,
        creation_date: convertDate(data.creation_date),
        last_activity_date: convertDate(data.last_activity_date),
        score: data.score,
    };
};
export { getAnswersById };
