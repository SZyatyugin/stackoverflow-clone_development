import React from "react";
import { useEffect, useMemo } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import AppAnswersComments from "../App-answers-comments";
import { getAnswersById } from "../../App-services";
import PropTypes from "prop-types";
import { setAnswersActiveFilter } from "../../App-store/reducers/answers-reducer";
let AppAnswers = (props) => {
    let { answersList, answersFilters, id, answersActiveFilter } = props;
    let dispatch = useDispatch();
    let dataForRequest = useMemo(() => {
        id, answersActiveFilter;
    }, [id, answersActiveFilter]);
    useEffect(() => {
        dispatch(getAnswersById(dataForRequest));
    }, [dataForRequest]);
    let answers = answersList.map((elem, index) => {
        let acceptedAnswer = elem.is_accepted ? (
            <div className="question-page___section-isanswered"></div>
        ) : null;
        return (
            <div className="answer-item" key={index}>
                <div className="question-page__section-vote">
                    <div className="question-page__section-upvote arrow-up"></div>
                    <div className="question-page__section-score ">
                        {elem.score}
                    </div>
                    <div className="question-page__section-downvote arrow-down"></div>
                    {acceptedAnswer}
                </div>
                <div
                    className="answer-item__section-description"
                    dangerouslySetInnerHTML={{ __html: elem.body }}
                ></div>
                <div className="question-page__user">
                    <Link to={`user/${elem.user_id}`}>
                        <div className="question-page__user-img">
                            <img src={elem.user_profile_image}></img>
                        </div>
                    </Link>
                    <div className="question-page__user-info">
                        <Link to={`user/${elem.user_id}`}>
                            <div className="app-question__user-name">
                                {elem.user_profile_name}
                            </div>
                        </Link>
                        <div className="question-page__user-reputation">
                            {elem.owner_reputation}
                        </div>
                    </div>
                </div>
            </div>
        );
    });
    return (
        <div className="question-page__answers">
            <div className="question-page__answers-stats">
                <div className="question-page__answers-counter">
                    {answersList.length} Answers
                </div>
                <div className="question-page__answers-filters">
                    {answersFilters.map((elem, index) => {
                        let filterClass =
                            elem === answersActiveFilter
                                ? "filters-item active"
                                : "filters-item";
                        return (
                            <div
                                className={filterClass}
                                key={index}
                                onClick={() => {
                                    dispatch(setAnswersActiveFilter(elem));
                                }}
                            >
                                {elem}
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="question-page__answers-section">{answers}</div>
            <AppAnswersComments id={id} />
        </div>
    );
};
const mapStateToProps = (state) => {
    let {
        answersReducer: { answersById, answersFilters, answersActiveFilter },
    } = state;
    return {
        answersList: answersById,
        answersFilters: answersFilters,
        answersActiveFilter: answersActiveFilter,
    };
};
AppAnswers.propTypes = {
    answersList: PropTypes.array,
    answersFilters: PropTypes.array,
    id: PropTypes.string,
    answersActiveFilter: PropTypes.string,
};
export default connect(mapStateToProps)(AppAnswers);
