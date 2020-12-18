import React from "react";
import { useRouteMatch } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import {
    getUserById,
    getUserQuestionsById,
    getUserAnswersById,
    getUserPostsById,
    getUserTopTags,
} from "../../App-services";
let AppUserPage = () => {
    let data = useSelector((state) => {
        let {
            userReducer: {
                questions,
                answers,
                posts,
                tags,
                activeFilter,
                filters,
                user,
            },
        } = state;
        return { questions, answers, posts, tags, activeFilter, filters, user };
    }, shallowEqual);
    let { questions, answers, posts, tags, activeFilter, filters, user } = data;
    let match = useRouteMatch();
    let { id } = match.params;
    let dispatch = useDispatch();
    let dataForRequest = useMemo(
        () => ({
            id,
            activeFilter,
        }),
        [id, activeFilter]
    );
    console.log(questions);
    console.log(answers);
    console.log(posts);
    console.log(tags);
    console.log(user);
    console.log(filters);
    useEffect(() => {
        dispatch(getUserById(dataForRequest.id));
        dispatch(getUserQuestionsById(dataForRequest));
        dispatch(getUserAnswersById(dataForRequest));
        dispatch(getUserPostsById(dataForRequest));
        dispatch(getUserTopTags(dataForRequest.id));
    }, [dataForRequest]);
    return <div className="app-user__section page-section">User</div>;
};
export default AppUserPage;
