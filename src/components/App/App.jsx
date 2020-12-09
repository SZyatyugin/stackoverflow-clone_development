import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AppHeader from "../App-header";
import AppAuthHandler from "../App-authHandler";
import { useEffect } from "react";
import PropTypes from "prop-types";
import "./App.scss";
import AppQuestionsList from "../App-questions-list";
import { useDispatch } from "react-redux";
import { getAllQuestions } from "../../App-store/actions";

const App = () => {
    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllQuestions());
    }, []);
    return (
        <Router>
            <div id="App">
                <Route path="?code=?" component={AppAuthHandler} />
                <AppHeader />
                <AppQuestionsList />
            </div>
        </Router>
    );
};
App.propTypes = {
    getAllQuestions: PropTypes.func,
};
export default App;
