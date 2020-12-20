import React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { getUserById } from "../../App-services";
let AppUserPageInfoDetails = (props) => {
    let { id } = props;
    let dispatch = useDispatch();

    let data = useSelector((state) => {
        let {
            userReducer: { user },
        } = state;
        return { user };
    }, shallowEqual);
    let { user } = data;
    useEffect(() => {
        dispatch(getUserById(id));
    }, [id]);
    return (
        <div className="app-user__information">
            <div className="app-user__information-logo">
                <div className="app-user__img">
                    <img src={user.profile_image}></img>
                </div>
                <div className="app-user__reputation">
                    {user.reputation}{" "}
                    <span className="app-user__fontstyle">REPUTATION</span>
                </div>
                <div className="app-user__badges">
                    <div className="app-user__badges-gold">
                        {user.badge_counts_gold}
                    </div>
                    <div className="app-user__badges-silver">
                        {user.badge_counts_silver}
                    </div>
                    <div className="app-user__badges-bronze">
                        {user.badge_counts_bronze}
                    </div>
                </div>
            </div>
            <div className="app-user__information-about">
                <div className="app-user__name">
                    <h2>{user.display_name}</h2>
                </div>
                <div
                    className="app-user__about"
                    dangerouslySetInnerHTML={{ __html: user.about_me }}
                ></div>
            </div>
            <div className="app-user__information-account">
                <div className="app-user__account-stats">
                    <div className="app-user__answered">
                        <div>{user.answer_count}</div>
                        <span className="app-user__fontstyle">answers</span>
                    </div>
                    <div className="app-user__questions">
                        <div>{user.question_count}</div>
                        <span className="app-user__fontstyle">questions</span>
                    </div>
                </div>
                <div className="app-user__location">{user.location}</div>
                <div className="app-user__account-created">
                    Member from{" "}
                    <span className="app-user__fontstyle">
                        {user.creation_date}
                    </span>
                </div>
                <div className="app-user__last-activity">
                    Last seen{" "}
                    <span className="app-user__fontstyle">
                        {user.last_access_date}
                    </span>
                </div>
            </div>
        </div>
    );
};
AppUserPageInfoDetails.propTypes = {
    id: PropTypes.string,
};
export default AppUserPageInfoDetails;
