import React from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import AppQuestionsListItems from "../App-questions-list-items/index";
import { getAllQuestions, getQuestionsByTags } from "../../App-services";
import { setFilter, setOrder } from "../../App-store/reducers/filter-reducer";
import AppLoadingPage from "../App-loading-page";
import AppErrorPage from "../App-error-page";
const AppQuestionsList = ({ match }) => {
    let tagIdForSearch = match.params?.id;
    let data = useSelector((state) => {
        let {
            filterReducer: { activeFilter, order, filters },
            questionsReducer: { loading },
        } = state;
        return {
            filters: filters,
            filter: activeFilter,
            order: order,
            loading: loading,
        };
    }, shallowEqual);
    let { filter, order, filters, loading } = data;
    let dataForRequest = useMemo(
        () => ({
            filter,
            order,
            tagIdForSearch,
        }),
        [filter, order, tagIdForSearch]
    );
    let dispatch = useDispatch();
    useEffect(() => {
        if (tagIdForSearch) {
            dispatch(getQuestionsByTags(dataForRequest));
        } else {
            dispatch(getAllQuestions(dataForRequest));
        }
    }, [dataForRequest]);
    let loadingHandler = loading === "loading" ? <AppLoadingPage /> : null;
    let errorHandler = loading === "failed" ? <AppErrorPage /> : null;
    let hasData = !(loadingHandler || errorHandler);
    let content = hasData ? <AppQuestionsListItems /> : null;

    return (
        <div className="app-questions__section page-section">
            <div className="app-questions-section__title">Top Questions</div>
            <div className="app-questions-section__filters">
                <ul className="question-filters">
                    {filters.map((elem, index) => {
                        let filterClass =
                            elem === filter
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
                    <li className="filters-item">
                        <div
                            className="arrow-up"
                            onClick={() => {
                                dispatch(setOrder("asc"));
                            }}
                        ></div>
                    </li>
                    <li className="filters-item">
                        <div
                            className="arrow-down"
                            onClick={() => {
                                dispatch(setOrder("desc"));
                            }}
                        ></div>
                    </li>
                </ul>
            </div>
            <div className="app-questions-section">
                {content}
                {loadingHandler}
                {errorHandler}
            </div>
        </div>
    );
};
AppQuestionsList.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object,
};
export default withRouter(AppQuestionsList);
