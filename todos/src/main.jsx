import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import "./sass/base.scss";

import { Provider } from 'react-redux'
import { store } from './redux/store';

ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
      <Router>
         <Provider store={store}>
            <App />
         </Provider>
      </Router>
   </React.StrictMode>
);
