import React from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getCommentsForQuestionById } from "../../App-services";
import AppComment from "../App-comment";
let AppQuestionComments = (props) => {
    let { id } = props;
    let dispatch = useDispatch();
    let comments = useSelector((state) => {
        return state.questionCommentsReducer.comments;
    });
    useEffect(() => {
        dispatch(getCommentsForQuestionById(id));
    }, [id]);
    return <AppComment comments={comments} />;
};

AppQuestionComments.propTypes = {
    id: PropTypes.string,
};

export default AppQuestionComments;
