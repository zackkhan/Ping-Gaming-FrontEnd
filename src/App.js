import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import { Switch, Route, withRouter, HashRouter } from "react-router-dom";
import NavigationBar from "./components/Navbar";
import Discover from "./components/Discover";

const mapDispatchToProps = dispatch => ({});

const mapStateToProps = state => ({
  ...state
});

class App extends Component {
  constructor(props) {
    super(props);
  }

  simpleAction = event => {};
  render() {
    return (
      <HashRouter>
        <div>
          <NavigationBar />
          {/* <Switch> */}
          <Route exact path="/" component={Discover} />
          {/* </Switch> */}
        </div>
      </HashRouter>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
