import React, { Component } from "react";
import axios from "axios";
import Navigation from "../Components/NavBar/Navigation";
import Articles from "./Articles";

const Layout = () => (
  <React.Fragment>
    <Navigation />
    <Articles />
  </React.Fragment>
)

export default Layout;
