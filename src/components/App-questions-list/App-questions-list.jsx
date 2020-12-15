import React from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import AppQuestionsListItems from "../App-questions-list-items/index";
import { getAllQuestions } from "../../App-services";
import { setFilter, setOrder } from "../../App-store/reducers/filterReducer";

const AppQuestionsList = () => {
    let data = useSelector((state) => {
        let {
            filterReducer: { activeFilter, order, filters },
            questionsReducer: { allQuestions },
        } = state;
        return {
            filters: filters,
            filter: activeFilter,
            order: order,
            allQuestions: allQuestions,
        };
    }, shallowEqual);
    let { filter, order, filters } = data;
    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllQuestions([order, filter]));
    }, [filter, order]);

    return (
        <div className="app-questions-section">
            <div className="app-questions-section__title">Top Questions</div>
            <div className="app-questions-section__filters">
                <ul className="question-filters">
                    {filters.map((elem, index) => {
                        return (
                            <li
                                className="filters-item"
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
                <AppQuestionsListItems />
            </div>
        </div>
    );
};

export default AppQuestionsList;
