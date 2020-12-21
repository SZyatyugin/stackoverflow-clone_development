import React from "react";
import { useRouteMatch } from "react-router-dom";
import AppQuestion from "../App-question";
import AppAnswers from "../App-answers";

let AppQuestionPage = () => {
    let match = useRouteMatch();
    return (
        <div className="question-page">
            <AppQuestion id={match.params.id} />
            <AppAnswers id={match.params.id} />
        </div>
    );
};
export default AppQuestionPage;
