import { createAsyncThunk } from "@reduxjs/toolkit";

const getAllQuestions = createAsyncThunk(
    "questionsReducer/getAllQuestions",
    async () => {
        let url =
            "https://api.stackexchange.com/2.2/questions?order=desc&sort=activity&site=stackoverflow";
        return await fetch(url)
            .then((result) => {
                return result.json();
            })
            .then((data) => {
                console.log(data);
                return allQuestionsResponseTemplate(data);
            });
    }
);
let allQuestionsResponseTemplate = (data) => {
    console.log(data);
    return data.items.map((elem) => {
        return {
            title: elem.title,
            view_count: elem.count,
            accepted_answer_id: elem.accepted_answer_id,
            answer_count: elem.answer_count,
            creation_date: convertDate(elem.creation_date),
            is_answered: elem.is_answered,
            last_activity_date: convertDate(elem.last_activity_date),
            question_id: elem.question_id,
            score: elem.score,
            tags: elem.tags,
            owner_user_id: elem.owner.user_id,
            owner_reputation: elem.owner.reputation,
            owner_accept_rate: elem.owner.accept_rate,
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
export { getAllQuestions };
