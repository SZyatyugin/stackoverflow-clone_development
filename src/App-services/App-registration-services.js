import React from "react";
import { createAsyncThunk } from "@reduxjs/toolkit";
import qs from "qs";
export default class AppRegistrationServices extends React.Component {
    getCodeForLogin() {
        const base_url = "https://stackoverflow.com/oauth/?";
        let params = {
            client_id: 19244,
            scope: "write_access",
            redirect_uri: "https://szyatyugin.github.io/",
        };
        let url = `${base_url}${qs.stringify(params)}`;
        location = url;
    }
}
let finishRegistration = createAsyncThunk(
    "tokenReducer/finishRegistration",
    async (data) => {
        const proxyURL = "https://cors-anywhere.herokuapp.com/";
        const urlForAuth = "https://stackoverflow.com/oauth/access_token/json";
        let params = {
            client_id: 19244,
            client_secret: "ybUFsFqqDiW9Rs2A7ZIgRA((",
            code: data,
            redirect_uri: "https://szyatyugin.github.io/",
        };
        return await fetch(proxyURL + urlForAuth, {
            method: "POST",
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: "follow",
            body: qs.stringify(params),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `Sorry. We've got an error. Response status ${response.status}. It's a bad request`
                    );
                }
                return response.json();
            })
            .then((data) => {
                localStorage.setItem("token", data);
                return data;
            })
            .catch((error) => {
                return error;
            });
    }
);
export { finishRegistration };
