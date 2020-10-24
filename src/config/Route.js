import React from "react";
//import Home from "./Home/Home";
import Login from "../component/Login";
//import MovieUpdate from "./Movie/Movie";
//import About from "./About/About";
import { Switch, Route } from "react-router";




const Routes = () => {

  return (
    <Switch>
        {/* <Route path="/About">
            <About />
        </Route> */}
        <Route path="/login">
            <Login />
        </Route>
        {/* <Route exact path="/">
            <Home />
        </Route> */}
        {/* <Route path="/Movie">
            <MovieUpdate />
        </Route> */}
    </Switch>
  );
};

export default Routes;