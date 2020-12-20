import React from "react";
import { Route, Switch } from "react-router-dom";
import AppQuestionsList from "../App-questions-list";
import AppQuestionPage from "../App-question-page";
import AppNavigation from "../App-navigation";
import AppUsersPage from "../App-users-page";
import AppTagsPage from "../App-tags-page";
import AppUserPage from "../App-user-page";
const AppPage = () => {
    return (
        <div className="app-section">
            <div className="container">
                <div className="app-section__wrapper">
                    <AppNavigation />
                    <Switch>
                        <Route exact path="/" component={AppQuestionsList} />
                        <Route
                            exact
                            path="/questions/tag/:id"
                            component={AppQuestionsList}
                        />
                        <Route path="/users" component={AppUsersPage} />
                        <Route path="/user/:id" component={AppUserPage}></Route>
                        <Route path="/tags" component={AppTagsPage} />
                        <Route
                            path="/questions/:id"
                            component={AppQuestionPage}
                        />
                    </Switch>
                </div>
            </div>
        </div>
    );
};
export default AppPage;
