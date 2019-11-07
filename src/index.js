import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { Provider } from "react-redux";

// Store
import store from "./redux";

// Components
import App from "./App";

// Styling
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/themify-icons.css";
import "./assets/css/owl.carousel.min.css";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
