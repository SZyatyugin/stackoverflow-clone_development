import { createAsyncThunk } from "@reduxjs/toolkit";

let getAllQuestions = createAsyncThunk(
    "questionsReducer/getAllQuestions",
    async (value) => {
        let [order, sort] = value;
        let url = `https://api.stackexchange.com/2.2/questions?order=${order}&sort=${sort}&site=stackoverflow&filter=!9_bDDxJY5`;
        return await fetch(url)
            .then((result) => {
                return result.json();
            })
            .then((data) => {
                return allQuestionsResponseTemplate(data);
            });
    }
);
let getQuestionById = createAsyncThunk(
    "questionsReducer/getQuestionById",
    async (id) => {
        let url = `https://api.stackexchange.com/2.2/questions/${id}?order=desc&sort=votes&site=stackoverflow&filter=!9_bDDxJY5`;
        return await fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                let question = data.items.find((elem) => elem);
                return questionResponseTemplate(question);
            });
    }
);
let getCommentsForQuestionById = createAsyncThunk(
    "questionReducer/getCommentsForQuestionById",
    async (id) => {
        let url = `https://api.stackexchange.com/2.2/questions/${id}/comments?order=asc&sort=creation&site=stackoverflow&filter=!9_bDE0E4s`;
        return await fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((result) => {
                return result.items.map((elem) => {
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
    };
};
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

let convertDate = (value) => {
    let date = new Date(value * 1000);
    let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    let day = date.getDay() < 10 ? `0${date.getDay()}` : `${date.getDay()}`;
    let hours =
        date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
    let minutes =
        date.getMinutes() < 10
            ? `0${date.getMinutes()}`
            : `${date.getMinutes()}`;
    return `${hours}:${minutes} ${day} ${
        months[date.getMonth()]
    } ${date.getFullYear()}`;
};
export { getAllQuestions, getQuestionById, getCommentsForQuestionById };
