import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppHeader from "../App-header";
import AppAuthHandler from "../App-authHandler";
import PropTypes from "prop-types";
import "./App.scss";
import AppQuestionsList from "../App-questions-list";
import AppQuestion from "../App-question";

const App = () => {
    return (
        <Router>
            <div id="App">
                <AppHeader />
                <Switch>
                    <Route path="?code=?" component={AppAuthHandler} />
                    <Route exact path="/" component={AppQuestionsList} />
                    <Route path="/questions/:id" component={AppQuestion} />
                </Switch>
            </div>
        </Router>
    );
};
App.propTypes = {
    getAllQuestions: PropTypes.func,
};
export default App;
