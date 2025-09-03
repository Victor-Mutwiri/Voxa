import { useState } from "react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import "../styles/Auth.css";

const Auth = () => {
    const [activeTab, setActiveTab] = useState("login");

    const handleTabSwitch = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h1 className="auth-title">Welcome</h1>
                    <h5>Logo</h5>
                    <p className="auth-subtitle">
                        {activeTab === "login" 
                            ? "Sign in to your account" 
                            : "Create a new account"
                        }
                    </p>
                </div>

                <div className="auth-tabs">
                    <button 
                        className={`tab-button ${activeTab === "login" ? "active" : ""}`}
                        onClick={() => handleTabSwitch("login")}
                    >
                        Login
                    </button>
                    <button 
                        className={`tab-button ${activeTab === "signup" ? "active" : ""}`}
                        onClick={() => handleTabSwitch("signup")}
                    >
                        Sign Up
                    </button>
                </div>

                <div className="auth-content">
                    {activeTab === "login" ? <Login /> : <Signup />}
                </div>

                <div className="auth-footer">
                    <p>
                        {activeTab === "login" ? (
                            <>
                                Don't have an account?{" "}
                                <button 
                                    className="link-button"
                                    onClick={() => handleTabSwitch("signup")}
                                >
                                    Sign up here
                                </button>
                            </>
                        ) : (
                            <>
                                Already have an account?{" "}
                                <button 
                                    className="link-button"
                                    onClick={() => handleTabSwitch("login")}
                                >
                                    Sign in here
                                </button>
                            </>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Auth;