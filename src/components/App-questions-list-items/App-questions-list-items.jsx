import React from "react";
import { connect } from "react-redux";
const AppQuestionsListItems = () => {
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
