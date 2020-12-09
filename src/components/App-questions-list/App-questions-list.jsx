import React from "react";
import AppQuestionsListItems from "../App-questions-list-items/index";
const AppQuestionsList = () => {
    return (
        <div className="app-questions-section">
            <div className="app-questions-section__title">
                <h2>Top Questions</h2>
            </div>
            <div className="app-questions-section__listitems">
                <AppQuestionsListItems />
            </div>
        </div>
    );
};
export default AppQuestionsList;
