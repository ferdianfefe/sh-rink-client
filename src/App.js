import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles/App.scss";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import List from "./pages/List";
import Logout from "./components/Logout";
import ProtectedRoute from "./components/ProtectedRoute";

import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div>
        <Route path="/" component={Navbar}></Route>

        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/signin">
            <Signin />
          </Route>
          <ProtectedRoute path="/home" component={Home}></ProtectedRoute>
          <ProtectedRoute path="/logout" component={Logout}></ProtectedRoute>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
