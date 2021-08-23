import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { AuthContextProvider } from "./context/auth.context";
import Router from "./Router";

const dotenv = require('dotenv');
dotenv.config();

axios.defaults.withCredentials = true;

class App extends Component {
  render() {
    return (
      <AuthContextProvider>
        <div className="container">
          <Router/>
        </div>
      </AuthContextProvider>
    );
  }
}

export default App;
