import React from "react";
import { Link } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";

const AppQuestionsListItems = () => {
    let allQuestions = useSelector((store) => {
        return store.questionsReducer.allQuestions;
    }, shallowEqual);
    let createQuestionWrapper = allQuestions.map((elem) => {
        let answerSelector = "question-item__stats-elem";
        if (elem.answer_count > 0) {
            answerSelector += " active";
        }
        if (elem.is_answered) {
            answerSelector += " answered";
        }
        return (
            <li key={elem.question_id} className="questions-list__item">
                <div className="question-item">
                    <div className="question-item__stats">
                        <Link to={`/questions/${elem.question_id}`}>
                            <div className="question-item__stats-elem">
                                <div className="votes-value">{elem.score}</div>
                                <div className="votes-title">votes</div>
                            </div>
                        </Link>
                        <Link to={`/questions/${elem.question_id}`}>
                            <div className={answerSelector}>
                                <div className="answers-value">
                                    {elem.answer_count}
                                </div>
                                <div className="answers-title">answers</div>
                            </div>
                        </Link>
                        <Link to={`/questions/${elem.question_id}`}>
                            <div className="question-item__stats-elem">
                                <div className="views-value">
                                    {elem.view_count}
                                </div>
                                <div className="views-title">views</div>
                            </div>
                        </Link>
                    </div>
                    <div className="question-item__section">
                        <Link to={`/questions/${elem.question_id}`}>
                            <div className="item__section-question">
                                {elem.title}
                            </div>
                        </Link>
                        <div className="question-item__info">
                            <div className="question__item-tags">
                                {elem.tags.map((elem, index) => {
                                    return (
                                        <div key={index} className="item-tag">
                                            <Link to={`/questions/tag/${elem}`}>
                                                {elem}
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="question-item__user">
                                <span className="question__date">
                                    asked {elem.creation_date}
                                </span>
                                <Link to={`/user/${elem.owner_user_id}`}>
                                    <span className="question__user">
                                        {elem.owner_display_name}
                                    </span>
                                </Link>
                                <span className="question__user-reputation">
                                    {elem.owner_reputation}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        );
    });

    return <ul className="questions-list">{createQuestionWrapper}</ul>;
};
export default AppQuestionsListItems;
