import { NavLink, useLocation, useNavigate } from "react-router-dom"
import "./Login.css";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../Contexts/DataContext";

const getActiveStyle = ({ isActive }) => ({
    margin: "1rem 0",
    fontSize: "15px",
    textDecoration: "none",
    padding: isActive ? "1rem" : "0.5rem",
    color: isActive ? "red" : "black"
});

export const Login = () => {

    const [passwordType, setPasswordType] = useState("password")

    const navigate = useNavigate();
    const location = useLocation();

    const [loginForm, setLoginForm] = useState({ email: "test@gmail.com", password: "test" });

    const { handleLoginClick, token, changeTitle } = useContext(DataContext);

    if (token) {
        navigate(location?.state?.from || "/products");
    }

    useEffect(() => {
        changeTitle("Login")
    }, [changeTitle])

    const handleShowHidePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
        } else {
            setPasswordType("password");
        }
    }

    return (
        <>
            <div className="login-card">
                <h1>Login</h1>
                <div className="userEmail">
                    <label htmlFor="email">
                        Email Address
                    </label>
                    <input type="text" id="email" placeholder="test@gmail.com" value={loginForm.email} onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })} />
                </div>
                <div className="userPassword">
                    <label htmlFor="password">
                        Password
                    </label>
                    <input type={passwordType} id="password" placeholder="********" value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} />
                </div>
                <div className="show-hide-password">
                    <span><input type="checkbox" onClick={() => handleShowHidePassword()} />{passwordType === "text" ? "Hide Password" : "Show Password"}</span>
                </div>
                <button onClick={() => handleLoginClick(loginForm)}>Login</button>
                <NavLink style={getActiveStyle} to="/signup">Create New Account</NavLink>
            </div>

        </>
    )
}


// ===============================

// import React, { useEffect } from 'react'
// import { useNavigate } from 'react-router'

// export function Login() {
//     const navigate = useNavigate();
//     useEffect(()=>{
//         navigate('/')
//     })
//   return (
//    <>
//    null
//    </>
//   )
// }
