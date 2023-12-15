import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import SignIn from "./pages/signin";
import SignUp from "./pages/signup";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import ProtectedRoute from "./components/protected-route";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <Home />
            </ProtectedRoute>
        ),
    },

    {
        path: "/api/auth/signin",
        element: (
            <div>
                <SignIn />
            </div>
        ),
    },
    {
        path: "/api/auth/signup",
        element: (
            <div>
                <SignUp />
            </div>
        ),
    },
    // {
    //     path: "/forgot-password",
    //     element: (

    //     ),
    // },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

reportWebVitals();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
