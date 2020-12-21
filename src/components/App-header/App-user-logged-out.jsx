import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import qs from "qs";
import AppLoginHOC from "../App-HOC";
import { finishRegistration } from "../../App-services";

const AppUserLoggedOut = (props) => {
    let history = useHistory();
    let dispatch = useDispatch();
    let { appLoginServices } = props;
    useEffect(() => {
        let code = qs.parse(location.search);
        let data = code["?code"];
        if (data) {
            dispatch(finishRegistration(data));
            history.push("/");
        }
    }, []);
    return (
        <div className="app-header__login">
            <button
                className="btn"
                onClick={() => {
                    appLoginServices.getCodeForLogin();
                }}
            >
                <span className="badge badge-primary">login</span>
            </button>
        </div>
    );
};
AppUserLoggedOut.propTypes = {
    appLoginServices: PropTypes.object,
};
export default AppLoginHOC(AppUserLoggedOut);
