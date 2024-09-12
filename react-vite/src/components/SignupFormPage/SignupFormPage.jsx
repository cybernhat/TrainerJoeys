import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

// Helper function for validating email format
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

function SignupFormPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector((state) => state.session.user);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});

    console.log(errors)
    if (sessionUser) return <Navigate to="/" replace={true} />;

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate email format
        if (!isValidEmail(email)) {
            return setErrors({
                email: "Please enter a valid email address",
            });
        }

        if (password !== confirmPassword) {
            return setErrors({
                confirmPassword:
                    "Confirm Password field must be the same as the Password field",
            });
        }

        const serverResponse = await dispatch(
            thunkSignup({
                first_name: firstName,
                last_name: lastName,
                email,
                username,
                password,
            })
        );

        if (serverResponse) {
            setErrors(serverResponse);
        } else {
            navigate("/");
        }
    };

    return (
        <div id="signup-form-page-container">
            <h1>Sign Up</h1>
            {errors.server && <p>{errors.server}</p>}
            <form className="signup-page-form" onSubmit={handleSubmit}>
                <div className="signup-first-name-container">
                    <label>First Name</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                    {errors.firstName && <span className='error-p'>{errors.firstName}</span>}
                </div>
                <div className="signup-last-name-container">
                    <label>Last Name</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                    {errors.lastName && <span className='error-p'>{errors.lastName}</span>}
                </div>
                <div className="signup-email-container">
                    <label>Email</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {errors.email && <span className='error-p'>{errors.email}</span>}
                </div>
                <div className="signup-username-container">
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    {errors.username && <span className='error-p'>{errors.username}</span>}
                </div>
                <div className="signup-password-container">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {errors.password && <span className='error-p'>{errors.password}</span>}
                </div>
                <div className="signup-confirm-password-container">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    {errors.confirmPassword && <span className='error-p'>{errors.confirmPassword}</span>}
                </div>
                <button className="signup-modal-button" type="submit">
                    Sign Up
                </button>
            </form>
            <div id="image-decoration-for-signup">
                <img
                    className="image-decoration-img"
                    src="../../signup-decoration-image.jpg"
                />
            </div>
        </div>
    );
}

export default SignupFormPage;
