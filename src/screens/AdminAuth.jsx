import { useState } from "react";
import { supabase } from '../supabaseClient';
import { useNavigate } from "react-router";
import AdminLogin from "../components/Authentication/AdminLogin";
import Signup from "../components/Authentication/Signup";
import Logo from '../assets/Voxa Logo.png'
import "../styles/Auth.css";

const AdminAuth = () => {
    const [activeTab, setActiveTab] = useState("login");
    const navigate = useNavigate();

    const handleTabSwitch = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h1 className="auth-title">Welcome Admin</h1>
                    {/* <h5>Logo</h5> */}
                    <a href="/">
                        <img src={Logo}  alt="Voxa Logo" className="auth-logo" />
                    </a>
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
                    {activeTab === "login" ? <AdminLogin /> : <Signup />}
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

export default AdminAuth;