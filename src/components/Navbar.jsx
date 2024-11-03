import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";
import logoImage from "../images/logo.png";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav>
      <Link to="/">
        <img src={logoImage} alt="Logo" className="logo" />
      </Link>
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </nav>
  );
};

export default Navbar;
