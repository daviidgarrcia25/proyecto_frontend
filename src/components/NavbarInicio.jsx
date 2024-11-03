import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";
import logoImage from "../images/logo.png";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav>
      <Link to="/">
        <img src={logoImage} alt="Logo" className="logo" />
      </Link>
    </nav>
  );
};

export default Navbar;
