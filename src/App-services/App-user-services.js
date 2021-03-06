import { createAsyncThunk } from "@reduxjs/toolkit";
import convertDate from "./convert-date";
let getUserById = createAsyncThunk("userReducer/getUserById", async (id) => {
    let url = `https://api.stackexchange.com/2.2/users/${id}?order=desc&sort=reputation&site=stackoverflow&filter=!--1nZv)deGu1`;
    return await fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let user = data.items.find((elem) => {
                return elem;
            });
            return templateForUser(user);
        });
});
let getUserQuestionsById = createAsyncThunk(
    "userReducer/getUserQuestionsById",
    async (data) => {
        let { id, activeFilter } = data;
        let url = `https://api.stackexchange.com/2.2/users/${id}/questions?pagesize=5&order=desc&sort=${activeFilter}&site=stackoverflow`;
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
                        id: elem.question_id,
                    };
                });
            });
    }
);
let getUserAnswersById = createAsyncThunk(
    "userReducer/getUserAnswersById",
    async (data) => {
        let { id, activeFilter } = data;
        let url = `https://api.stackexchange.com/2.2/users/${id}/answers?pagesize=5&order=desc&sort=${activeFilter}&site=stackoverflow&filter=!9_bDE(DzN`;
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
                        id: elem.question_id,
                    };
                });
            });
    }
);
let getUserPostsById = createAsyncThunk(
    "userReducer/getUserPostsById",
    async (data) => {
        let { id, activeFilter } = data;
        let url = `https://api.stackexchange.com/2.2/users/${id}/posts?pagesize=5&order=desc&sort=${activeFilter}&site=stackoverflow&filter=!9_bDDt835`;
        let dataPosts = await fetch(url)
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
                        id: elem.post_id,
                        post_type: elem.post_type,
                        score: elem.score,
                        title: elem.title,
                        last_activity_date: convertDate(
                            elem.last_activity_date
                        ),
                    };
                });
            });
        let promise = dataPosts.map((elem) => {
            if (elem.post_type === "answer") {
                let url = `https://api.stackexchange.com/2.2/answers/${elem.id}?order=desc&sort=creation&site=stackoverflow`;
                return fetch(url)
                    .then((response) => {
                        return response.json();
                    })
                    .then((result) => {
                        let data = result.items.find((elem) => {
                            return elem;
                        });
                        return {
                            ...elem,
                            ...{ question_id: data.question_id },
                        };
                    });
            }
            return elem;
        });
        return Promise.all(promise).then((response) => {
            return response;
        });
    }
);
let getUserTopTags = createAsyncThunk(
    "userReducer/getUserTopTags",
    async (id) => {
        let url = `https://api.stackexchange.com/2.2/users/${id}/top-tags?pagesize=5&site=stackoverflow&filter=!9_bDE.B6I`;
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
let getMyAccount = createAsyncThunk(
    "tokenReducer/getMyAccount",
    async (token) => {
        let url = `https://api.stackexchange.com/2.2/me?order=desc&sort=reputation&site=stackoverflow&filter=!--1nZv)fAzeX&key=wsIZYqmzzlvamta3lpmnnQ((&access_token=${token}`;
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
                let user = data.items.find((elem) => {
                    return elem;
                });
                return templateForUser(user);
            })
            .catch((error) => {
                return error;
            });
    }
);

let templateForUser = (data) => {
    return {
        badge_counts_bronze: data.badge_counts.bronze,
        badge_counts_silver: data.badge_counts.silver,
        badge_counts_gold: data.badge_counts.gold,
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
    getMyAccount,
};
