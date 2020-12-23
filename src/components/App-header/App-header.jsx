import React from "react";
import { connect, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { getQuestionsBySearch } from "../../App-services";
import AppUserLoggedIn from "./App-user-logged-in";
import AppUserLoggedOut from "./App-user-logged-out";
import AppLoginHOC from "../App-HOC";
import { getToken } from "../../App-store/reducers";
const AppHeader = (props) => {
    let history = useHistory();
    let { isLoggedIn } = props;
    let [inputValue, setInputValue] = useState("");
    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(getToken());
    }, []);
    let userCheckLogin = isLoggedIn ? (
        <AppUserLoggedIn />
    ) : (
        <AppUserLoggedOut />
    );
    return (
        <div className="app-header">
            <div className="container">
                <div className="app-header__wrapper">
                    <div className="app-header__title">
                        <Link to="/">
                            {" "}
                            <h2>Stackoveflow Clone</h2>
                        </Link>
                    </div>

                    <div className="app-header__search">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                dispatch(getQuestionsBySearch(inputValue));
                                setInputValue("");
                                history.push("/");
                            }}
                        >
                            <input
                                type="search"
                                placeholder="Search all sites"
                                value={inputValue}
                                onChange={(e) => {
                                    setInputValue(e.target.value);
                                }}
                            ></input>
                        </form>
                    </div>
                    <div className="app-header__login-status">
                        {userCheckLogin}
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isLoggedIn: !!state.tokenReducer.token,
    };
};
export default AppLoginHOC(connect(mapStateToProps)(AppHeader));

AppHeader.propTypes = {
    isLoggedIn: PropTypes.bool,
    appLoginServices: PropTypes.object,
};
