import { useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../../supabaseClient";


const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: ""
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

    const validateForm = () => {
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return false;
        }
        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters long");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        setLoading(true);
        setError("");

        try {
            const { data, error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        full_name: formData.fullName,
                    }
                }
            });

            if (error) {
                setError(error.message);
            } else {
                // Store signup data for onboarding
                localStorage.setItem('signupToken', 'true');
                localStorage.setItem('pendingEmail', formData.email);
                
                // Navigate to onboarding
                navigate('/onboarding');
            }
        } catch (err) {
            setError("An unexpected error occurred");
            console.error("Signup error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            {error && <div className="error-message">{error}</div>}
            
            <div className="form-group">
                <label htmlFor="signup-fullname" className="form-label">
                    Full Name
                </label>
                <input
                    type="text"
                    id="signup-fullname"
                    name="fullName"
                    className="form-input"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                />
            </div>

            <div className="form-group">
                <label htmlFor="signup-email" className="form-label">
                    Email Address
                </label>
                <input
                    type="email"
                    id="signup-email"
                    name="email"
                    className="form-input"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                />
            </div>

            <div className="form-group">
                <label htmlFor="signup-password" className="form-label">
                    Password
                </label>
                <input
                    type="password"
                    id="signup-password"
                    name="password"
                    className="form-input"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter your password"
                />
            </div>

            <div className="form-group">
                <label htmlFor="signup-confirm-password" className="form-label">
                    Confirm Password
                </label>
                <input
                    type="password"
                    id="signup-confirm-password"
                    name="confirmPassword"
                    className="form-input"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="Confirm your password"
                />
            </div>

            <div className="form-options">
                <label className="checkbox-container">
                    <input type="checkbox" required />
                    <span className="checkbox-text">
                        I agree to the Terms of Service and Privacy Policy
                    </span>
                </label>
            </div>

            <button 
                type="submit" 
                className="submit-button"
                disabled={loading}
            >
                {loading ? "Creating account..." : "Create Account"}
            </button>
        </form>
    );
};

export default Signup;