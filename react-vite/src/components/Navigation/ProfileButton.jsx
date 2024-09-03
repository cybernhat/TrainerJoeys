import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
function ProfileButton() {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const user = useSelector((store) => store.session.user);
    const ulRef = useRef();
    const navigate = useNavigate();

    const toggleMenu = (e) => {
        e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const logout = (e) => {
        e.preventDefault();
        dispatch(thunkLogout());
        navigate("/");
        closeMenu();
    };

    return (
        <>
            <button className="icon-button" onClick={toggleMenu}>
                <FaUserAlt className="user-icon" />
            </button>
            {showMenu && (
                <ul className={"profile-dropdown"} ref={ulRef}>
                    {user ? (
                        <>
                            <h3>Hi {user.first_name}!</h3>
                            <div className="user-profile-list">
                                <NavLink
                                    className="user-navlink-container"
                                    to="/user"
                                >
                                    My Profile
                                </NavLink>

                                <div className="logout-button">
                                    <button
                                        className="logout-button"
                                        onClick={logout}
                                    >
                                        Log Out
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="log-in-container">
                                <OpenModalMenuItem
                                    itemText="Log In"
                                    onItemClick={closeMenu}
                                    modalComponent={<LoginFormModal />}
                                    className='log-in-modal-container'
                                />
                            </div>
                            <div className="sign-up-container">
                                <OpenModalMenuItem
                                    itemText="Sign Up"
                                    onItemClick={closeMenu}
                                    modalComponent={<SignupFormModal />}
                                />
                            </div>
                        </>
                    )}
                </ul>
            )}
        </>
    );
}

export default ProfileButton;
