import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { VideoApp } from "./pages/VideoApp/VideoApp";
import { StatisticPage } from "./pages/StatisticPage/StatisticPage";
import { AppHeader } from "./cmps/AppHeader/AppHeader";
import { Signup } from "./pages/Signup/Signup";
import { userService } from "./services/userService";
import "./App.scss";

function setValid() {
  return userService.getLoggedinUser();
}
export function App() {
  const PrivateRoute = (props) => {
    const isSignup = setValid();
    return isSignup ? (
      <Route component={props.component} path={props.path} />
    ) : (
      <Redirect to="/signup" />
    );
  };
  return (
    <Router>
      <div className="App">
        <AppHeader />
        <Switch>
          <PrivateRoute component={StatisticPage} path="/stats" />
          <Route component={Signup} path="/signup" />
          <PrivateRoute isUser={true} component={VideoApp} path="/" />
        </Switch>
      </div>
    </Router>
  );
}
