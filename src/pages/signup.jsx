import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

async function signupUser(input, navigate) {
    try {
        const response = await fetch("http://localhost:8080/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(input),
        });

        if (!response.ok) {
            throw new Error("Signup failed");
        }

        const data = await response.json();
        sessionStorage.setItem("accessToken", data.accesToken);

        navigate("/");
    } catch (error) {
        console.error("Signup error:", error.message);
    }
}

function SignUp() {
    const navigate = useNavigate();

    const [input, setInput] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInput((prevInput) => ({
            ...prevInput,
            [name]: value,
        }));
    };

    const handleSignup = (e) => {
        e.preventDefault();
        signupUser(input, navigate);
    };

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div className="SignIn">
                <h1>Budget app</h1>
                <form className="signin-form" onSubmit={handleSignup}>
                    <div>
                        <h2>Sign Up</h2>
                        <p style={{ marginTop: "15px" }}>
                            Do have an account?{" "}
                            <a style={{ color: "#1C4532" }} href="/api/auth/signin">
                                Sign in
                            </a>
                        </p>
                    </div>

                    <div className="signin-inputs">
                        <label>
                            Name
                            <input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Surname
                            <input
                                type="text"
                                name="surname"
                                value={input.surname}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            E-mail
                            <input
                                type="email"
                                name="email"
                                value={input.email}
                                onChange={handleInputChange}
                            />
                        </label>

                        <label>
                            Password
                            <input
                                type="password"
                                name="password"
                                value={input.password}
                                onChange={handleInputChange}
                            />
                        </label>
                    </div>

                    <div className="signin-rememberMe">
                        <button className="signin-button" type="submit">
                            Sign Up
                        </button>
                    </div>
                </form>
                <main className="signin-main" style={{ height: "107%" }}>
                    <header>
                        <p>Support</p>
                    </header>

                    <div className="signin-main-container">
                        <div className="signin-main-middle-img">
                            <div>
                                <h3 style={{ fontSize: "24px", fontWeight: "700" }}>
                                    Reach financial <br /> goals faster
                                </h3>
                                <p
                                    style={{
                                        marginTop: "10px",
                                        marginBottom: "10px",
                                        fontSize: "14px",
                                    }}
                                >
                                    Use your Venus card around the world with no hidden fees. Hold,
                                    transfer and spend money.
                                </p>
                                <button className="signin-main-middle-btn">learn more</button>
                            </div>

                            <img
                                src="https://www.m1cu.org/images/mem1st/checking/greendebitcard.png"
                                alt="card"
                            />
                        </div>

                        <div className="signin-main-container-footer">
                            <p
                                style={{
                                    fontSize: "24px",
                                    fontWeight: "700",
                                    marginBottom: "30px",
                                    color: "#F7FAFC",
                                }}
                            >
                                Introducing new features
                            </p>
                            <p>
                                Analyzing previous trends ensures that businesses <br /> always make the
                                right decision. And as the scale of <br /> the decision and it’s impact
                                magnifies...
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default SignUp;
