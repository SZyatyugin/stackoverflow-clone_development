import React from "react";
import { connect, useDispatch } from "react-redux";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useState } from "react";
import { setTagPageFilter } from "../../App-store/reducers";
import { getAllTags } from "../../App-services";
import AppLoadingPage from "../App-loading-page";
import AppErrorPage from "../App-error-page";
let AppTagsPage = (props) => {
    let [inputValue, setInputValue] = useState("");
    let dispatch = useDispatch();
    let {
        activeFilter,
        tagsPageFilters,
        tagsData,
        loading,
        setTagPageFilter,
    } = props;
    useEffect(() => {
        dispatch(getAllTags(activeFilter));
    }, [activeFilter]);
    let tags = tagsData.filter((elem) => {
        if (!inputValue) {
            return elem;
        }
        if (elem.name.indexOf(inputValue) > -1) {
            return elem;
        }
    }, []);
    let loadingHandler = loading === "loading" ? <AppLoadingPage /> : null;
    let errorHandler = loading === "failed" ? <AppErrorPage /> : null;
    let hasData = !(loadingHandler || errorHandler);
    let dataTags = tags.map((elem, index) => {
        return (
            <li className="tag-item" key={index}>
                <div className="tag-title">
                    <Link to={`/questions/tag/${elem.name}`}>{elem.name}</Link>
                </div>
                <div className="tag-description">
                    You can find additional information by {elem.name} tag
                </div>
                <div className="tag-stats">
                    <div className="tag-stats__count">
                        {elem.count} questions
                    </div>
                </div>
            </li>
        );
    });
    let content = hasData ? dataTags : null;
    return (
        <div className="app-tags__section page-section">
            <div className="app-tags__section-header">
                <h2>Tags</h2>
            </div>
            <div className="app-tags__section-description">
                A tag is a keyword or label that categorizes your question with
                other, similar questions. Using the right tags makes it easier
                for others to find and answer your question.
            </div>
            <div className="app-tags__section-filters">
                <div className="app-tags__input">
                    {" "}
                    <input
                        type="text"
                        placeholder="Filter by tag name"
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                        }}
                    ></input>
                </div>
                <div className="app-tags__filters">
                    <ul>
                        {tagsPageFilters.map((elem, index) => {
                            let filterClass =
                                elem === activeFilter
                                    ? "filters-item active"
                                    : "filters-item";
                            return (
                                <li
                                    className={filterClass}
                                    key={index}
                                    onClick={() => {
                                        setTagPageFilter(elem);
                                    }}
                                >
                                    {elem}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <div className="app-tags__section-items">
                {content}
                {loadingHandler}
                {errorHandler}
            </div>
        </div>
    );
};
AppTagsPage.propTypes = {
    tagsData: PropTypes.array,
    activeFilter: PropTypes.string,
    tagsPageFilters: PropTypes.array,
    loading: PropTypes.string,
    tagWiki: PropTypes.array,
    setTagPageFilter: PropTypes.func,
};
const mapStateToProps = (state) => {
    let {
        tagsReducer: { tags, activeFilter, tagsPageFilters, loading },
    } = state;
    return {
        tagsData: tags,
        activeFilter: activeFilter,
        tagsPageFilters: tagsPageFilters,
        loading: loading,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setTagPageFilter: (value) => {
            dispatch(setTagPageFilter(value));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AppTagsPage);
