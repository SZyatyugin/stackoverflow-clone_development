import React from "react";
import { AppRegistrationServices } from "../../App-services/";
class AppAuthHandler extends React.Component {
    appLogin = new AppRegistrationServices();

    componentDidMount() {
        this.appLogin.finishRegistration();
    }
}
export default AppAuthHandler;
