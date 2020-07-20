import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./Components/App";
import "bootstrap/dist/css/bootstrap.min.css";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "../src/Redux/Reducers/index";
import MiddleWare from "../src/Middleware";

const store = createStore(rootReducer, MiddleWare);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
