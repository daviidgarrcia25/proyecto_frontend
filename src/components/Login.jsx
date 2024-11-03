import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./NavbarInicio";

const API_URL = import.meta.env.VITE_API_URL; // Usar la variable de entorno

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${API_URL}/auth/login`, // Usar la variable de entorno
        formData
      );
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response.data.msg || "Error al iniciar sesión");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="welcome-section">
          <h1>Bienvenido a GestAPP</h1>
          <h1>tu gestor de gastos favorito</h1>
          <p className="slogan">
            Toma el control de tus finanzas, construye tu futuro.
          </p>
        </div>
        <h2>Iniciar Sesión</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Contraseña:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              required
            />
          </div>
          <button type="submit">Iniciar Sesión</button>
        </form>
        <p>
          ¿No tienes una cuenta? <a href="/register">Regístrate</a>
        </p>
      </div>
    </>
  );
};

export default Login;
