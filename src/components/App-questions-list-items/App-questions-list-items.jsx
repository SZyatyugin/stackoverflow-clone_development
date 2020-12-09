import React from "react";
import { connect } from "react-redux";
const AppQuestionsListItems = ({ allQuestions }) => {
    createQuestionBox = allQuestions.map((elem) => {
        return (
            <li key={elem.question_id}>
                <div className="app-questions-section__listitem">
                </div>
            </li>
        );
    });

    return <ul></ul>;
};

const mapStateToProps = (state) => {
    let { questionsReducer } = state;
    console.log(questionsReducer.allQuestions);
    return {
        allQuestions: questionsReducer.allQuestions,
    };
};
export default connect(mapStateToProps)(AppQuestionsListItems);
