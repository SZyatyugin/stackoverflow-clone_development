import React from "react";
import AppQuestion from "../App-question";
import AppAnswers from "../App-answers";

let AppQuestionPage = () => {
    return (
        <div className="container">
            <AppQuestion />
            <AppAnswers />
        </div>
    );
};
export default AppQuestionPage;
