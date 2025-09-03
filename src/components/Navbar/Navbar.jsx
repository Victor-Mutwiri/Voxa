import { useState } from "react";
import { useNavigate } from "react-router";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="logo-container">
        <a href="/">
        Logo
          {/* <img src={Logo} alt="Vimtec Logo" className="logo" /> */}
        </a>
      </div>

      {/* <button >
        <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
      </button> */}

      <div className='nav-links'>
        <a href="/home" className="nav-link" >Home</a>
        <a href="/auth" className="nav-link">Get Started</a>
      </div>
    </nav>
  );
};

export default Navbar;
