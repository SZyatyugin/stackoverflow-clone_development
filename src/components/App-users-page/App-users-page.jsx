import React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllUsers } from "../../App-services";
import {
    setUsersPageFilter,
    setUsersPageOrder,
} from "../../App-store/reducers";
import AppLoadingPage from "../App-loading-page";
import AppErrorPage from "../App-error-page";

let AppUsersPage = () => {
    let [inputValue, getInputValue] = useState(null);
    let dispatch = useDispatch();
    let users = useSelector((state) => {
        let {
            usersReducer: { users },
        } = state;
        if (!inputValue) {
            return users;
        }
        return users.filter((elem) => {
            if (
                elem.display_name
                    .toLowerCase()
                    .indexOf(inputValue.toLowerCase()) > -1
            ) {
                return elem;
            }
        });
    }, shallowEqual);
    let data = useSelector((state) => {
        let {
            usersReducer: { activeFilter, filters, order, loading },
        } = state;
        return { activeFilter, filters, order, loading };
    }, shallowEqual);
    let { activeFilter, order, filters, loading } = data;
    useEffect(() => {
        dispatch(getAllUsers([order, activeFilter]));
    }, [activeFilter, order]);
    let loadingHandler = loading === "loading" ? <AppLoadingPage /> : null;
    let errorHandler = loading === "failed" ? <AppErrorPage /> : null;
    let hasData = !(loadingHandler || errorHandler);
    let usersItem = users.map((elem, index) => {
        return (
            <div className="app-users__item" key={index}>
                <div className="app-users__item-wrapper">
                    <div className="app-user__img">
                        <Link to={`user/${elem.user_id}`}>
                            <img src={elem.profile_image}></img>
                        </Link>
                    </div>
                    <div className="app-users__description">
                        <div className="app-users__name">
                            <Link to={`user/${elem.user_id}`}>
                                {elem.display_name}
                            </Link>
                        </div>
                        <div className="app-user__location">
                            {elem.location}
                        </div>
                        <div
                            className="app-user__reputation"
                            title="reputation"
                        >
                            {elem.reputation}
                        </div>
                        <div
                            className="app-user__about-me"
                            dangerouslySetInnerHTML={{ __html: elem.about_me }}
                        ></div>
                    </div>
                </div>
            </div>
        );
    });
    let content = hasData ? usersItem : null;
    return (
        <div className="app-users__section page-section">
            <div className="app-users__section-header">
                <h2>Users</h2>
            </div>
            <div className="app-users__section-filters">
                <div className="app-users__input">
                    <input
                        type="text"
                        placeholder="Filter by user"
                        onChange={(e) => getInputValue(e.target.value)}
                    ></input>
                </div>
                <div className="app-users__filters-wrapper">
                    <ul className="app-users__filters">
                        {filters.map((elem, index) => {
                            let filterClass =
                                activeFilter === elem
                                    ? "filters-item active"
                                    : "filters-item";
                            return (
                                <li
                                    className={filterClass}
                                    key={index}
                                    onClick={() => {
                                        dispatch(setUsersPageFilter(elem));
                                    }}
                                >
                                    {elem}
                                </li>
                            );
                        })}
                        <li className="filters-item">
                            <div
                                className="arrow-up"
                                onClick={() => {
                                    dispatch(setUsersPageOrder("asc"));
                                }}
                            ></div>
                        </li>
                        <li className="filters-item">
                            <div
                                className="arrow-down"
                                onClick={() => {
                                    dispatch(setUsersPageOrder("desc"));
                                }}
                            ></div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="app-users__list">
                {loadingHandler} {errorHandler} {content}
            </div>
        </div>
    );
};
export default AppUsersPage;
