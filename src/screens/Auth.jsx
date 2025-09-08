import { useState } from "react";
import { supabase } from '../supabaseClient';
import { useNavigate } from "react-router";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import "../styles/Auth.css";

const Auth = () => {
    const [activeTab, setActiveTab] = useState("login");
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [signupData, setSignupData] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });
    const [loginErrors, setLoginErrors] = useState({});
    const [signupErrors, setSignupErrors] = useState({});
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleTabSwitch = (tab) => {
        setActiveTab(tab);
    };

    const validateLogin = () => {
        const errors = {};
        if (!loginData.email) errors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(loginData.email)) errors.email = 'Email is invalid';
        if (!loginData.password) errors.password = 'Password is required';
        else if (loginData.password.length < 6) errors.password = 'Password must be at least 6 characters';
        setLoginErrors(errors);
        return Object.keys(errors).length === 0;
    };

const validateSignup = () => {
const errors = {};
if (!signupData.firstName) errors.firstName = 'First name is required';
if (!signupData.lastName) errors.lastName = 'Last name is required';
if (!signupData.email) errors.email = 'Email is required';
else if (!/\S+@\S+\.\S+/.test(signupData.email)) errors.email = 'Email is invalid';
if (!signupData.password) errors.password = 'Password is required';
else if (signupData.password.length < 6) errors.password = 'Password must be at least 6 characters';
if (!signupData.confirmPassword) errors.confirmPassword = 'Please confirm your password';
else if (signupData.password !== signupData.confirmPassword) errors.confirmPassword = 'Passwords do not match';
setSignupErrors(errors);
return Object.keys(errors).length === 0;
};

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!validateLogin()) return;

    setLoading(true);
    setError('');
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      });

      if (error) throw error;

      // Successfully logged in
      navigate('/home');
    } catch (err) {
      setError(err.message);
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (!validateSignup()) return;

    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signUp({
        email: signupData.email,
        password: signupData.password,
        options: {
          data: {
            first_name: signupData.firstName,
            last_name: signupData.lastName,
          }
        }
      });

      if (error) throw error;

      // Set temporary token for onboarding access
      localStorage.setItem('signupToken', 'true');
      localStorage.setItem('pendingEmail', signupData.email);

      // Successfully signed up
      toast.success('Account created successfully! Please check your email to verify your account.');
      navigate('/onboarding');
    } catch (err) {
      setError(err.message);
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
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