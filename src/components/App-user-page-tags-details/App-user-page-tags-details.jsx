import React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { getUserTopTags } from "../../App-services";
let AppUserPageTagsDetails = (props) => {
    let { id } = props;
    let dispatch = useDispatch();
    let data = useSelector((state) => {
        let {
            userReducer: { tags },
        } = state;
        return { tags };
    }, shallowEqual);
    useEffect(() => {
        dispatch(getUserTopTags(id));
    }, [id]);
    let { tags } = data;
    return (
        <div className="app-user__top-tags">
            <div className="app-user__tags-header">
                <h2>Top Tags</h2>
            </div>
            <div className="app-user__tags-wrapper">
                <ul className="app-user__tags-list">
                    {tags.map((elem, index) => {
                        return (
                            <li className="app-user__tags-item" key={index}>
                                <div>
                                    <div className="tag-title">
                                        <Link
                                            to={`/questions/tag/${elem.tag_name}`}
                                        >
                                            {elem.tag_name}
                                        </Link>
                                    </div>
                                </div>
                                <div className="tag-stats">
                                    <div className="tag-stats__score">
                                        <span className="app-user__fontstyle">
                                            SCORE
                                        </span>{" "}
                                        {elem.answer_score}
                                    </div>
                                    <div className="tag-stats__posts">
                                        <span className="app-user__fontstyle">
                                            POSTS
                                        </span>{" "}
                                        {elem.answer_count}
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};
AppUserPageTagsDetails.propTypes = {
    id: PropTypes.string,
};
export default AppUserPageTagsDetails;
