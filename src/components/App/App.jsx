import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import PropTypes from "prop-types";
import "./App.scss";

import AppHeader from "../App-header";
import AppPage from "../App-page";

const App = () => {
    return (
        <Router>
            <div id="App">
                <AppHeader />
                <AppPage />
            </div>
        </Router>
    );
};
App.propTypes = {
    getAllQuestions: PropTypes.func,
};
export default App;
