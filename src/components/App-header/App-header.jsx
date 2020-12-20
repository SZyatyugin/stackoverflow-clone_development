import React from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";
import { getQuestionsBySearch } from "../../App-services";
import AppUserLoggedIn from "./App-user-logged-in";
import AppUserLoggedOut from "./App-user-logged-out";
import AppLoginHOC from "../App-HOC";
const AppHeader = (props) => {
    let { isLoggedIn } = props;
    let [inputValue, setInputValue] = useState("");
    let dispatch = useDispatch();

    let userCheckLogin = isLoggedIn ? (
        <AppUserLoggedIn />
    ) : (
        <AppUserLoggedOut />
    );
    return (
        <div className="app-header">
            <div className="container">
                <div className="app-header__wrapper">
                    <Link to="/">
                        <div className="app-header__title">
                            <h2>Stackoveflow Clone</h2>
                        </div>
                    </Link>
                    <div className="app-header__search">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                dispatch(getQuestionsBySearch(inputValue));
                                setInputValue("");
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
        token: state.tokenReducer.token,
    };
};
export default AppLoginHOC(connect(mapStateToProps)(AppHeader));

AppHeader.propTypes = {
    isLoggedIn: PropTypes.bool,
    token: PropTypes.string,
    appLoginServices: PropTypes.object,
};
