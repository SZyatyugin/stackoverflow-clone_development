import React from "react";
import { AppRegistrationServicesConsumer } from "../../App-Services-Context";

const AppLoginHOC = (Wrap) => {
    return class HOC extends React.Component {
        render() {
            return (
                <AppRegistrationServicesConsumer>
                    {(appLoginServices) => {
                        return (
                            <Wrap
                                {...this.props}
                                appLoginServices={appLoginServices}
                            />
                        );
                    }}
                </AppRegistrationServicesConsumer>
            );
        }
    };
};
export default AppLoginHOC;
