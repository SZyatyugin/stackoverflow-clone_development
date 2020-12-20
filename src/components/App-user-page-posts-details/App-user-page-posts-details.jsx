import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useEffect, useMemo } from "react";
import {
    getUserQuestionsById,
    getUserAnswersById,
    getUserPostsById,
} from "../../App-services";
import { setFilter, setSortListItem } from "../../App-store/reducers";
let AppUserPagePostsDetails = (props) => {
    let { id } = props;
    let dispatch = useDispatch();
    let data = useSelector((state) => {
        let {
            userReducer: {
                posts,
                activeFilter,
                filters,
                sortList,
                sortListItem,
            },
        } = state;
        return {
            posts,
            activeFilter,
            filters,
            sortList,
            sortListItem,
        };
    }, shallowEqual);
    let { posts, activeFilter, filters, sortList, sortListItem } = data;
    let dataForRequest = useMemo(
        () => ({
            id,
            activeFilter,
        }),
        [id, activeFilter]
    );
    useEffect(() => {
        switch (sortListItem) {
            case "All":
                dispatch(getUserPostsById(dataForRequest));
                break;
            case "Questions":
                dispatch(getUserQuestionsById(dataForRequest));
                break;
            case "Answers":
                dispatch(getUserAnswersById(dataForRequest));
                break;
        }
    }, [dataForRequest, sortListItem]);
    return (
        <div className="app-user__posts">
            <div className="app-user__posts-filter">
                <div className="app-user__posts-title">
                    <h2>Newest {sortListItem}</h2>
                </div>
                <div className="app-user__posts-filter-items">
                    <ul>
                        {sortList.map((elem, index) => {
                            let filterClass =
                                elem === sortListItem
                                    ? "filters-item active"
                                    : "filters-item";
                            return (
                                <li
                                    className={filterClass}
                                    key={index}
                                    onClick={() => {
                                        dispatch(setSortListItem(elem));
                                    }}
                                >
                                    {elem}
                                </li>
                            );
                        })}
                    </ul>
                    <ul>
                        {filters.map((elem, index) => {
                            let filterClass =
                                elem === activeFilter
                                    ? "filters-item active"
                                    : "filters-item";
                            return (
                                <li
                                    className={filterClass}
                                    key={index}
                                    onClick={() => {
                                        dispatch(setFilter(elem));
                                    }}
                                >
                                    {elem}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <div className="app-user__posts-list-wrapper">
                <ul className="app-user__posts-list">
                    {posts.map((elem, index) => {
                        let elemClass = elem.is_answered
                            ? "posts-item__score answered"
                            : "posts-item__score";
                        return (
                            <li key={index} className="posts-item">
                                <div className={elemClass}>{elem.score}</div>
                                <div className="posts-item__title">
                                    {elem.title}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};
AppUserPagePostsDetails.propTypes = {
    id: PropTypes.string,
};
export default AppUserPagePostsDetails;
