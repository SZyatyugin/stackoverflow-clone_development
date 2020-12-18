import React from "react";
import { useRouteMatch } from "react-router-dom";
import AppQuestion from "../App-question";
import AppAnswers from "../App-answers";

let AppQuestionPage = () => {
    let match = useRouteMatch();
    return (
        <React.Fragment>
            <AppQuestion id={match.params.id} />
            <AppAnswers id={match.params.id} />
        </React.Fragment>
    );
};
export default AppQuestionPage;
