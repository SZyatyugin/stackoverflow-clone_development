import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
let AppComment = (props) => {
    let { comments } = props;
    return (
        <div className="question-page__comments">
            {comments.map((elem, index) => {
                return (
                    <div className="question-page__comment" key={index}>
                        <div className="question-page__comment-description">
                            {elem.body} -{" "}
                            <Link to={`user/${elem.user_id}`}>
                                <span className="comment-owner">
                                    {elem.owner_display_name}{" "}
                                </span>
                            </Link>
                            <span className="comment-date">
                                {" "}
                                {elem.creation_date}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
AppComment.propTypes = {
    comments: PropTypes.array,
};
export default AppComment;
