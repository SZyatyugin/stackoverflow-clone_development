import { createAsyncThunk } from "@reduxjs/toolkit";
import convertDate from "./convert-date";
let getUserById = createAsyncThunk("userReducer/getUserById", async (id) => {
    let url = `https://api.stackexchange.com/2.2/users/${id}?order=desc&sort=reputation&site=stackoverflow&filter=!--1nZv)deGu1`;
    return await fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            return data.items.find((elem) => {
                return templateForUser(elem);
            });
        });
});
let getUserQuestionsById = createAsyncThunk(
    "userReducer/getUserQuestionsById",
    async (data) => {
        let { id, activeFilter } = data;
        let url = `https://api.stackexchange.com/2.2/users/${id}/answers?order=desc&sort=${activeFilter}&site=stackoverflow&filter=!9_bDE(DzN`;
        return await fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                return data.items.map((elem) => {
                    return {
                        is_answered: elem.is_answered,
                        score: elem.score,
                        title: elem.title,
                        question_id: elem.question_id,
                    };
                });
            });
    }
);
let getUserAnswersById = createAsyncThunk(
    "userReducer/getUserAnswersById",
    async (data) => {
        let { id, activeFilter } = data;
        let url = `https://api.stackexchange.com/2.2/users/${id}/answers?order=desc&sort=${activeFilter}&site=stackoverflow&filter=!9_bDE(DzN`;
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
                    return {
                        is_answered: elem.is_answered,
                        score: elem.score,
                        title: elem.title,
                        question_id: elem.question_id,
                    };
                });
            });
    }
);
let getUserPostsById = createAsyncThunk(
    "userReducer/getUserPostsById",
    async (data) => {
        let { id, activeFilter } = data;
        let url = `https://api.stackexchange.com/2.2/users/${id}/posts?order=desc&sort=${activeFilter}&site=stackoverflow&filter=!9_bDDt835`;
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
                    return {
                        user_id: elem.user_id,
                        post_id: elem.post_id,
                        score: elem.score,
                        title: elem.title,
                    };
                });
            });
    }
);
let getUserTopTags = createAsyncThunk(
    "userReducer/getUserTopTags",
    async (id) => {
        console.log(id);
        let url = `https://api.stackexchange.com/2.2/users/${id}/top-tags?site=stackoverflow`;
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
                    return {
                        user_id: elem.user_id,
                        answer_count: elem.answer_count,
                        answer_score: elem.answer_score,
                        question_count: elem.question_count,
                        question_score: elem.question_score,
                        tag_name: elem.tag_name,
                    };
                });
            });
    }
);
let templateForUser = (data) => {
    return {
        badge_counts_bronze: data.badge_counts.bronze,
        badge_counts_silver: data.badge_counts_silver,
        badge_counts_gold: data.badge_counts_gold,
        view_count: data.view_count,
        answer_count: data.answer_count,
        question_count: data.question_count,
        account_id: data.account_id,
        user_id: data.user_id,
        reputation: data.reputation,
        creation_date: convertDate(data.creation_date),
        last_access_date: convertDate(data.last_access_date),
        about_me: data.about_me,
        location: data.location,
        profile_image: data.profile_image,
        display_name: data.display_name,
    };
};
export {
    getUserById,
    getUserQuestionsById,
    getUserAnswersById,
    getUserPostsById,
    getUserTopTags,
};
