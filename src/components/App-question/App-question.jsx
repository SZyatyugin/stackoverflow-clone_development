import React from "react";
import { connect, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import AppQuestionComments from "../App-question-comments";
import { getQuestionById } from "../../App-services";
let AppQuestion = (props) => {
    let { question, id } = props;
    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(getQuestionById(id));
    }, [id]);

    return (
        <div className="question-page__question">
            <div className="question-header">
                <div className="question-title">
                    <h2>{question.title}</h2>
                </div>
                <div className="question-stats">
                    <div className="question-stats__created">
                        <span>Asked </span>
                        {question.creation_date}
                    </div>
                    <div className="question-stats__active">
                        <span>Active </span>
                        {question.last_activity_date}
                    </div>
                    <div className="question-stats__viewed">
                        <span>Viewed </span>
                        {question.view_count}
                        <span> times</span>
                    </div>
                </div>
            </div>
            <div className="question-page__question-section">
                <div className="question-page__section-vote">
                    <div className="question-page__section-upvote arrow-up"></div>
                    <div className="question-page__section-score ">
                        {question.score}
                    </div>
                    <div className="question-page__section-downvote arrow-down"></div>
                </div>
                <div
                    className="question-page__section-description"
                    dangerouslySetInnerHTML={{ __html: question.body }}
                ></div>
                <div className="question-page__section-footer">
                    <div className="app-question__tags">
                        {question.tags?.map((elem, index) => {
                            return (
                                <div key={index} className="item-tag">
                                    {elem}
                                </div>
                            );
                        })}
                    </div>
                    <div className="question-page__user">
                        <Link to={`/user/${question.user_id}`}>
                            <div className="question-page__user-img">
                                <img src={question.user_profile_image}></img>
                            </div>
                        </Link>
                        <div className="question-page__user-info">
                            <Link to={`/user/${question.user_id}`}>
                                <div className="question-page__user-name">
                                    {question.user_profile_name}
                                </div>
                            </Link>
                            <div
                                className="question-page__user-reputation"
                                title="reputation score"
                            >
                                {question.owner_reputation}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AppQuestionComments id={id} />
        </div>
    );
};
AppQuestion.propTypes = {
    question: PropTypes.object,
    id: PropTypes.string,
};
const mapStateToProps = (state) => {
    let {
        questionReducer: { question },
    } = state;
    return {
        question: question,
    };
};
export default connect(mapStateToProps)(AppQuestion);
