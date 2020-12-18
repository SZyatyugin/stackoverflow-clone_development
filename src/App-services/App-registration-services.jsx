import React from "react";
import qs from "qs";
export default class AppRegistrationServices extends React.Component {
    getToken() {
        this.getCode();
    }
    getCode() {
        const base_url = "https://stackoverflow.com/oauth/?";
        let params = {
            client_id: 19244,
            scope: "write_access",
            redirect_uri: "http://d5a6eaeaf0e7.ngrok.io",
        };
        let url = `${base_url}${qs.stringify(params)}`;
        location = url;
    }
    finishRegistration() {
        let code = qs.parse(location.search);
        this.createPostRequest(code["?code"]);
    }
    createPostRequest(data) {
        const proxyURL = "https://cors-anywhere.herokuapp.com/";
        const urlForAuth = "https://stackoverflow.com/oauth/access_token/json";
        let params = {
            client_id: 19244,
            client_secret: "ybUFsFqqDiW9Rs2A7ZIgRA((",
            code: data,
            redirect_uri: "http://d5a6eaeaf0e7.ngrok.io",
        };
        fetch(proxyURL + urlForAuth, {
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
                console.log(data);
            });
    }
}
