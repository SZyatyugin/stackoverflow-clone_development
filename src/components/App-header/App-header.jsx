import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
const AppHeader = (props) => {
    let { isLoggedIn } = props;
    let userCheckLogin = isLoggedIn ? <UserLoggedin /> : <UserLoggedOut />;
    return (
        <div className="app-header">
            <div className="container">
                <div className="app-header__wrapper">
                    <div className="app-header__title">
                        <h2>Stackoveflow Clone</h2>
                    </div>
                    <div className="app-header__search">
                        <form>
                            <input
                                type="search"
                                placeholder="Search all sites"
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

export default connect(mapStateToProps)(AppHeader);
AppHeader.propTypes = {
    isLoggedIn: PropTypes.bool,
};
const UserLoggedin = () => {
    return (
        <div className="app-header__login">
            <div className="app-header__user-icon"></div>
            <div className="app-header__user-username"></div>
        </div>
    );
};
const UserLoggedOut = () => {
    return (
        <div className="app-header__login">
            <button className="btn">
                <span className="badge badge-primary">login</span>
            </button>
        </div>
    );
};
