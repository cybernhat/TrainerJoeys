import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

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

    if (sessionUser) return <Navigate to="/" replace={true} />;

    const handleSubmit = async (e) => {
        e.preventDefault();

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
                    {errors.firstName && <p>{errors.firstName}</p>}
                </div>
                <div className="signup-last-name-container">
                    <label>Last Name</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                    {errors.lastName && <p>{errors.lastName}</p>}
                </div>
                <div className="signup-email-container">
                    <label>Email</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {errors.email && <p>{errors.email}</p>}
                </div>
                <div className="signup-username-container">
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    {errors.username && <p>{errors.username}</p>}
                </div>
                <div className="signup-password-container">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {errors.password && <p>{errors.password}</p>}
                </div>
                <div className="signup-confirm-password-container">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                </div>
                <button className="signup-modal-button" type="submit">
                    Sign Up
                </button>
            </form>
            <div id='image-decoration-for-signup'>
              <img className='image-decoration-img' src='../../signup-decoration-image.jpg'/>
            </div>
        </div>
    );
}

export default SignupFormPage;
