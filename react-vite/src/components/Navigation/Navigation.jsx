import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import OpenModalMenuItem from "./OpenModalMenuItem";

function Navigation() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false)

  const user = useSelector(state => state.session.user)
    return (
        <ul className="navigation-bar">
            <li className="button">
                <NavLink to="/">
                    <img
                        id="home-icon"
                        src="../../../official_logo.png"
                        alt="Home"
                    />
                </NavLink>
            </li>
            <li className="login-logout-container">
                {user ? (
                    <ProfileButton />
                ) : (
                    <>
                        <NavLink to="/login" className="login-button">
                            Log In
                        </NavLink>
                        <NavLink to="/signup" className="logout-button">
                            Sign Up
                        </NavLink>
                    </>
                )}
            </li>
        </ul>
    );
}
export default Navigation;
