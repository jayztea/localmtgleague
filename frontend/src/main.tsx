import React from "react";

import ReactDOM from "react-dom/client";

import App from "./App";

import {
    AuthProvider
}
from "./auth/AuthContext";

import "./index.css";
import "./styles/variables.css";
import "./pages/CreateMatch/CreateMatch.css";


ReactDOM.createRoot(
    document.getElementById("root")!
)
.render(

    <React.StrictMode>

        <AuthProvider>

            <App />

        </AuthProvider>

    </React.StrictMode>

);