import React from "react";
import { useRouteMatch } from "react-router-dom";
import AppUserPageInfoDetails from "../App-user-page-info-details";
import AppUserPageTagsDetails from "../App-user-page-tags-details";
import AppUserPagePostsDetails from "../App-user-page-posts-details";

let AppUserPage = () => {
    let match = useRouteMatch();
    let { id } = match.params;
    return (
        <div className="app-user__section page-section">
            <AppUserPageInfoDetails id={id} />
            <AppUserPageTagsDetails id={id} />
            <AppUserPagePostsDetails id={id} />
        </div>
    );
};
export default AppUserPage;
