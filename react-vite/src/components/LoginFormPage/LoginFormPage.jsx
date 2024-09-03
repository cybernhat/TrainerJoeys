import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    if (sessionUser) return <Navigate to="/" replace={true} />;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const serverResponse = await dispatch(
            thunkLogin({
                email,
                password,
            })
        );

        if (serverResponse) {
            setErrors(serverResponse);
        } else {
            navigate("/");
        }
    };

    const handleDemo = async (e) => {
        e.preventDefault();

        setErrors({});
        return await dispatch(
            thunkLogin({
                email: "demo@aa.io",
                password: "password",
            })
        )
            .then(navigate("/"))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                }
            });
    };

    return (
        <div id="login-form-page-container">
            <h1>Log In</h1>
            {errors.length > 0 &&
                errors.map((message) => <p key={message}>{message}</p>)}
            <form onSubmit={handleSubmit} className="login-page-form">
                <div className="login-email-container">
                    <label>Email</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {errors.email && <p>{errors.email}</p>}
                </div>
                <div className="login-password-container">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {errors.password && <p>{errors.password}</p>}
                </div>
                <div className="submit-buttons">
                    <button className="modal-button" type="submit">
                        Log In
                    </button>
                    <button className="modal-button" onClick={handleDemo}>
                        Log in as Demo User
                    </button>
                </div>
            </form>
            <div id="image-decoration-for-login">
                <img src="../../decoration-image.webp" />
            </div>
        </div>
    );
}

export default LoginFormPage;
