import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector, shallowEqual } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import AppLoginHOC from "../App-HOC";
import { getMyAccount } from "../../App-services";
import { LogOut } from "../../App-store/reducers";
const AppUserLoggedIn = () => {
    let history = useHistory();
    let dispatch = useDispatch();
    let data = useSelector((state) => {
        let {
            tokenReducer: { token, currentUserAccount },
        } = state;
        return { currentUserAccount, token };
    }, shallowEqual);
    let { currentUserAccount, token } = data;
    useEffect(() => {
        dispatch(getMyAccount(token));
    }, [token]);
    return (
        <div className="app-header__user">
            <div className="app-header__user-icon">
                <Link to={`/user/${currentUserAccount.user_id}`}>
                    <img src={currentUserAccount.profile_image}></img>
                </Link>
            </div>
            <div className="app-header__user-username">
                <Link to={`/user/${currentUserAccount.user_id}`}>
                    {currentUserAccount.display_name}
                </Link>
            </div>
            <div className="app-header__login">
                <button
                    className="btn"
                    onClick={() => {
                        dispatch(LogOut());
                        history.push("/");
                    }}
                >
                    <span className="badge badge-primary">log out</span>
                </button>
            </div>
        </div>
    );
};

export default AppLoginHOC(AppUserLoggedIn);
