import { createAsyncThunk } from "@reduxjs/toolkit";
import convertDate from "./convert-date";
let getAllQuestions = createAsyncThunk(
    "questionsReducer/getAllQuestions",
    async (value) => {
        let { filter, order } = value;
        let url = `https://api.stackexchange.com/2.2/questions?order=${order}&sort=${filter}&site=stackoverflow&filter=!9_bDDxJY5`;
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
                return allQuestionsResponseTemplate(data);
            });
    }
);
let getQuestionById = createAsyncThunk(
    "questionReducer/getQuestionById",
    async (value) => {
        console.log("question render");
        let url = `https://api.stackexchange.com/2.2/questions/${value}?order=desc&sort=activity&site=stackoverflow&filter=!9_bDDxJY5`;
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
                let question = data.items.find((elem) => elem);
                return questionResponseTemplate(question);
            });
    }
);
let getQuestionsByTags = createAsyncThunk(
    "questionsReducer/getQuestionsByTags",
    async (value) => {
        let { filter, order, tagIdForSearch } = value;
        let url = `https://api.stackexchange.com/2.2/search/advanced?order=${order}&sort=${filter}&tagged=${tagIdForSearch}&site=stackoverflow`;
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
                return allQuestionsResponseTemplate(data);
            });
    }
);
let getQuestionsBySearch = createAsyncThunk(
    "questionsReducer/getQuestionsBySearch",
    async (value) => {
        let url = `https://api.stackexchange.com/2.2/search?order=desc&sort=activity&intitle=${value}&site=stackoverflow`;
        return fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                return allQuestionsResponseTemplate(data);
            });
    }
);
let questionResponseTemplate = (data) => {
    return {
        user_id: data.owner.user_id,
        question_id: data.question_id,
        body: data.body,
        owner_reputation: data.owner.reputation,
        tags: data.tags,
        view_count: data.view_count,
        user_profile_image: data.owner.profile_image,
        user_profile_name: data.owner.display_name,
        title: data.title,
        creation_date: convertDate(data.creation_date),
        last_activity_date: convertDate(data.last_activity_date),
        score: data.score,
    };
};
let allQuestionsResponseTemplate = (data) => {
    return data.items.map((elem) => {
        return {
            title: elem.title,
            view_count: elem.view_count,
            accepted_answer_id: elem.accepted_answer_id
                ? elem.accepted_answer_id
                : null,
            answer_count: elem.answer_count,
            creation_date: convertDate(elem.creation_date),
            is_answered: elem.is_answered,
            last_activity_date: convertDate(elem.last_activity_date),
            question_id: elem.question_id,
            score: elem.score,
            tags: elem.tags,
            body: elem.body,
            owner_user_id: elem.owner.user_id,
            owner_reputation: elem.owner.reputation,
            owner_accept_rate: elem.owner.accept_rate
                ? elem.owner.accept_rate
                : null,
            owner_display_name: elem.owner.display_name,
            owner_profile_image: elem.owner.profile_image,
        };
    });
};

export {
    getAllQuestions,
    getQuestionById,
    getQuestionsByTags,
    getQuestionsBySearch,
};
