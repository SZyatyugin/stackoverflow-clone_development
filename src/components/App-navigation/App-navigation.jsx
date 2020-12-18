import React from "react";
import { Link } from "react-router-dom";
const AppNavigation = () => {
    return (
        <div className="app-navigation">
            <div className="app-navigation__wrapper">
                <div className="app-navigation__item">
                    <Link to="/">Home</Link>
                </div>
                <div className="app-navigation__item">
                    <Link to="/tags">Tags</Link>
                </div>
                <div className="app-navigation__item">
                    <Link to="/users">Users</Link>
                </div>
            </div>
        </div>
    );
};
export default AppNavigation;
