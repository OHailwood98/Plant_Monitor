import React from "react";
import { Route, Switch } from "react-router-dom";
import ValidRoute from "./utils/routes/ValidRoute";
import MediaQuery from "react-responsive";

import Welcome from "./components/pages/WelcomePage";

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
      </Switch>
    </body>
  );
}

export default App;
