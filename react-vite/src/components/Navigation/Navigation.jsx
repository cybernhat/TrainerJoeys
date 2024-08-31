import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <ul className='navigation-bar'>
      <li className='button'>
        <NavLink to="/">
        <img id='home-icon' src='../../../official_logo.png' alt='Home'/>
        </NavLink>
      </li>

      <li>
        <ProfileButton />
      </li>
    </ul>
  );
}

export default Navigation;
