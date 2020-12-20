import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import store from "./App-store";
import { Provider } from "react-redux";
import { AppRegistrationServicesProvider } from "./App-Services-Context";
import { AppRegistrationServices } from "./App-services";
const appLoginServices = new AppRegistrationServices();
ReactDOM.render(
    <Provider store={store}>
        <AppRegistrationServicesProvider value={appLoginServices}>
            <App />
        </AppRegistrationServicesProvider>
    </Provider>,
    document.getElementById("root")
);
