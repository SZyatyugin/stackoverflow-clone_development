import React from "react";
import { useRouteMatch } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
    getQuestionById,
    getCommentsForQuestionById,
} from "../../App-services";
import PropTypes from "prop-types";
let AppQuestion = (props) => {
    let { question, comments } = props;
    console.log(question);
    console.log(comments);
    let dispatch = useDispatch();
    let match = useRouteMatch();
    useEffect(() => {
        dispatch(getQuestionById(match.params.id));
        dispatch(getCommentsForQuestionById(match.params.id));
    }, [match.params.id]);

    return (
        <div className="container">
            <div className="app-question">
                <div className="app-question__header">
                    <div className="app-question__title">
                        <h2>{question.title}</h2>
                    </div>
                    <div className="app-question__stats">
                        <div className="app-question__stats-created">
                            <span>Asked</span>
                            {question.creation_date}
                        </div>
                        <div className="app-question__stats-active">
                            <span>Active</span>
                            {question.last_activity_date}
                        </div>
                        <div className="app-question__stats-viewed">
                            <span>Viewed</span>
                            {question.view_count}
                        </div>
                    </div>
                </div>
                <div className="app-question__section">
                    <div className="app-question__section-vote">
                        <div className="app-question__section-upvote"></div>
                        <div className="app-question__section-">
                            {question.score}
                        </div>
                        <div className="app-question__section-downvote"></div>
                    </div>
                    <div
                        className="app-question__section-description"
                        dangerouslySetInnerHTML={{ __html: question.body }}
                    ></div>
                    <div className="app-question__tags">
                        {question.tags?.map((elem, index) => {
                            return (
                                <div key={index} className="item-tag">
                                    {elem}
                                </div>
                            );
                        })}
                    </div>
                    <div className="app-question__user">
                        <div className="app-question__user-img">
                            <img src={question.user_profile_image}></img>
                        </div>
                        <div className="app-question__user-info">
                            <div className="app-question__user-name">
                                {question.user_profile_name}
                            </div>
                            <div className="app-question__user-reputation">
                                {question.owner_reputation}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="app-question__comments">
                    {comments.map((elem, index) => {
                        return (
                            <div className="app-question__comment" key={index}>
                                <div className="app-question__comment-description">
                                    {elem.body} -{" "}
                                    <span>{elem.owner_display_name}</span>
                                    <span>{elem.creation_date}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
AppQuestion.propTypes = {
    question: PropTypes.object,
    comments: PropTypes.array,
};
const mapStateToProps = (state) => {
    let {
        questionsReducer: { question, comments },
    } = state;
    return {
        question: question,
        comments: comments,
    };
};
export default connect(mapStateToProps)(AppQuestion);
