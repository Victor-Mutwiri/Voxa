import { useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../../supabaseClient";
import useStore from "../../useStore";

const Login = () => {
    const navigate = useNavigate();
    const setUserId = useStore(state => state.setUserId);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // Clear error when user starts typing
        if (error) setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            });

            if (error) {
                setError(error.message);
            } else {
                const userId = data.user.id;
                localStorage.setItem('user', JSON.stringify(data.user));
                localStorage.setItem('userId', userId);
                setUserId(userId); // Set user ID in store
                navigate('/home');
            }
        } catch (err) {
            setError("An unexpected error occurred");
            console.error("Login error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            {error && <div className="error-message">{error}</div>}
            
            <div className="form-group">
                <label htmlFor="login-email" className="form-label">
                    Email Address
                </label>
                <input
                    type="email"
                    id="login-email"
                    name="email"
                    className="form-input"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                />
            </div>

            <div className="form-group">
                <label htmlFor="login-password" className="form-label">
                    Password
                </label>
                <input
                    type="password"
                    id="login-password"
                    name="password"
                    className="form-input"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter your password"
                />
            </div>

            <div className="form-options">
                <label className="checkbox-container">
                    <input type="checkbox" />
                    <span className="checkbox-text">Remember me</span>
                </label>
                <button type="button" className="forgot-password">
                    Forgot password?
                </button>
            </div>

            <button 
                type="submit" 
                className="submit-button"
                disabled={loading}
            >
                {loading ? "Signing in..." : "Sign In"}
            </button>
        </form>
    );
};

export default Login;