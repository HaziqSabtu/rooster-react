import React from "react";
import { render } from "react-dom";

// https://v5.reactrouter.com/web/guides/philosophy
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import "./index.css";

const root = document.getElementById("root");
render(
    <Router>
        <App />
    </Router>,
    root
);
