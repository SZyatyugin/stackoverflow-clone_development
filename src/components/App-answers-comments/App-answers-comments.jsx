import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { getCommentsForAnswersById } from "../../App-services";
import AppComment from "../App-comment";

let AppAnswersComments = (props) => {
    let { id } = props;
    let dispatch = useDispatch();
    let comments = useSelector((state) => {
        return state.answersCommentsReducer.comments;
    });
    useEffect(() => {
        dispatch(getCommentsForAnswersById(id));
    }, [id]);
    return <AppComment comments={comments} />;
};
AppAnswersComments.propTypes = {
    id: PropTypes.string,
};

export default AppAnswersComments;
