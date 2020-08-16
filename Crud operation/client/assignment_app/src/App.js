import React, { Component, createContext, useState } from "react";
// import Table from './components/Table';
// import logo from './logo.svg';
import "./App.css";
// import { string } from 'prop-types';
// import { Tab } from '@material-ui/core';
// import Assignments from "./containers/Assignments/Assignments";
import Students from "./containers/Students/Student";
import Drawer from "./components/Drawer";
import Assignments from "./containers/Assignments/Assignments";
import { Route, Switch } from "react-router-dom";
import { useLocation } from "react-router";
import Login from "./components/Login/Login";
import withAuthentication from "../src/components/withAuthentication";
import Dashboard from "./containers/Dashboards/index";

const Home = () => {};
const withDrawer = (location) => {
  if (location.pathname === "/Login") {
    return true;
  } else {
    return false;
  }
};

export const DataProvider = createContext();

const App = () => {
  let location = useLocation();
  const [contextVal, setContextValue] = useState(1);
  console.log(location);
  console.log("localStorage", localStorage);
  const isDrawer = withDrawer(location);
  console.log(
    "App.js->Environment.REACT_APP_SERVICE_URL",
    process.env.REACT_APP_SERVICE_URL
  );
  const onIncrease = () => {
    setContextValue(
      `rgb(${Math.random() * 256}, ${Math.random() * 256},${
        Math.random() * 256
      })`
    );
  };
  return !isDrawer ? (
    <Drawer>
      <button onClick={onIncrease}>Click For Increment : {contextVal}</button>
      <DataProvider.Provider value={contextVal}>
        <Switch>
          {/* switch provides kind of typical switch case alternatives similar to regular ones. just providing options which path to called for a key/ component */}
          <Route component={Assignments} path={"/Assignments"} />
          <Route component={Students} path={"/Students"} />
          {/* its a kind of inline rendering instead of giving component name we telling the route that we rendering a component by its definition/ inline definition */}
          <Route
            // render={withAuthentication(() => {
            //   return <h1>"Hello to my default route"</h1>;
            // })}
            // render={}
            component={Dashboard}
            path={"/"}
          />
          {/* <Route component={Login} path={"/Login"} /> */}
        </Switch>
      </DataProvider.Provider>
    </Drawer>
  ) : (
    <Switch>
      <Route component={Login} path={"/Login"} />
    </Switch>
  );
};
export default App;
