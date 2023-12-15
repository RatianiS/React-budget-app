import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./component-style/header.css";
import { Navigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const logout = () => {
        const token = sessionStorage.getItem("accessToken");

        if (token) {
            sessionStorage.removeItem("accessToken");
            navigate("/api/auth/signin");
        }
    };

    return (
        <header className="header">
            <h1 className="header-h1">Budget App</h1>
            <div className="header-div">
                <button className="header-btn">Profile</button>
                <button className="header-btn" onClick={logout}>
                    Log Out
                </button>
            </div>
        </header>
    );
};

export default Header;
