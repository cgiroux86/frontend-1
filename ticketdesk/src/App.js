import React from "react";
import "./styles/app.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/login";
import Register from "./components/register";
import "./utils/axiosDefaults";
import Dashboard from "./components/dashboard";
import Expansion from "./components/dashboard/Expansion";
import PrivateRoute from "./utils/privateRoute";
import Admin from "./components/admin";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/admin" component={Admin} />
        <Route exact path="/expansion" component={Expansion} />
      </Router>
    </div>
  );
}

export default App;
