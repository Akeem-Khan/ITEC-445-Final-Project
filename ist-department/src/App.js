import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { AuthContextProvider } from "./context/auth.context";
import Router from "./Router";
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

const dotenv = require('dotenv');
dotenv.config();

axios.defaults.withCredentials = true;

class App extends Component {
  render() {
    return (
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
    );
  }
}
export default App;
