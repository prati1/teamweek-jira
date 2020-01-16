import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Container } from "reactstrap";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import AppNavbar from "./components/AppNavbar";
import JiraTimeline from "./components/JiraTimeline";
import TeamWeekHome from "./components/TeamWeekHome";

const App = () => {
  return (
    <div>
      <AppNavbar />
      <Router>
        <div>
          <Route exact path="/" component={TeamWeekHome} />
          <Route path="/jira-timeline" component={JiraTimeline} />
        </div>
      </Router>
    </div>
  );
};

export default App;
