import React from "react";
import { Route, Switch } from "react-router-dom";
import ValidRoute from "./utils/routes/ValidRoute";
import MediaQuery from "react-responsive";

import Welcome from "./components/pages/WelcomePage";
import Login from "./components/pages/LoginPage";
import Signup from "./components/pages/SignupPage";
import Invalid from "./components/pages/InvalidPage";
import UpdatePassword from "./components/pages/UpdatePasswordPage";
import Confirm from "./components/pages/ConfirmEmailPage";
import MyDevices from "./components/pages/MyDevicesPage"

import TopNavBar from "./components/nav/TopNavBar";
import MobileNavBar from "./components/nav/MobileNavBar";

function App() {
  return (
    <body>
      <MediaQuery minDeviceWidth={768}>
        <TopNavBar />
      </MediaQuery>
      <MediaQuery maxDeviceWidth={767}>
        <MobileNavBar />
      </MediaQuery>
      <Switch>
        <Route path="/" exact component={Welcome} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <ValidRoute path="/updatepassword" exact component={UpdatePassword} />
        <Route path="/invalid" exact component={Invalid} />
        <Route path="/confirmation/:token" exact component={Confirm}/>
        <ValidRoute path="/mydevices" exact component={MyDevices} />
      </Switch>
    </body>
  );
}

export default App;
