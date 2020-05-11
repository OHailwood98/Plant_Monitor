import React from "react";
import { Route, Switch } from "react-router-dom";
import ValidRoute from "./utils/routes/ValidRoute";

import Welcome from "./components/pages/WelcomePage";
import Login from "./components/pages/LoginPage";
import Signup from "./components/pages/SignupPage";
import Invalid from "./components/pages/InvalidPage";
import UpdatePassword from "./components/pages/UpdatePasswordPage";
import Confirm from "./components/pages/ConfirmEmailPage";
import MyDevices from "./components/pages/MyDevicesPage"
import Readings from "./components/pages/ReadingPage"
import Actions from "./components/pages/ActionsPage"

import TopNavBar from "./components/nav/TopNavBar";

function App() {
  return (
    <body>
      <TopNavBar />
      <Switch>
        <Route path="/" exact component={Welcome} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <ValidRoute path="/updatepassword" exact component={UpdatePassword} />
        <Route path="/invalid" exact component={Invalid} />
        <Route path="/confirmation/:token" exact component={Confirm}/>
        <ValidRoute path="/mydevices" exact component={MyDevices} />
        <ValidRoute path="/readings" exact component={Readings} />
        <ValidRoute path="/actions" exact component={Actions} />
      </Switch>
    </body>
  );
}

export default App;
