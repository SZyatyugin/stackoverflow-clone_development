import React from "react";
import { useRouteMatch } from "react-router-dom";
import AppQuestion from "../App-question";
import AppAnswers from "../App-answers";

let AppQuestionPage = () => {
    let match = useRouteMatch();
    let {
        params: { id },
    } = match;
    return (
        <div className="question-page">
            <AppQuestion id={id} />
            <AppAnswers id={id} />
        </div>
    );
};
export default AppQuestionPage;
