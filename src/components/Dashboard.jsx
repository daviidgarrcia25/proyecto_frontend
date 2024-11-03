import React, { useEffect, useState } from "react";
import axios from "axios";
import GraficaGastos from "./GraficaGastos";
import Navbar from "./Navbar";

const API_URL = import.meta.env.VITE_API_URL; // Usar la variable de entorno

const Dashboard = () => {
  const [gastos, setGastos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    categoria: "",
    monto: "",
    fecha: "",
    descripcion: "",
  });
  const [gastoMaximo, setGastoMaximo] = useState("");

  const { categoria, monto, fecha, descripcion } = formData;

  useEffect(() => {
    const fetchGastos = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}/gastos`, {
          headers: {
            "x-auth-token": token,
          },
        });
        setGastos(res.data);
        verificarGastoTotal(res.data);
      } catch (err) {
        setError("Error al cargar los gastos");
      } finally {
        setLoading(false);
      }
    };

    fetchGastos();
  }, []);

  const verificarGastoTotal = (gastos) => {
    const totalGastos = gastos.reduce((total, gasto) => total + gasto.monto, 0);
    if (gastoMaximo > 0 && totalGastos > gastoMaximo) {
      alert(`¡Has superado tu gasto máximo mensual de €${gastoMaximo}!`);
    }
  };

  const onChange = (e) => {
    const value =
      e.target.name === "monto" || e.target.name === "gastoMaximo"
        ? e.target.value
        : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (monto === "") {
      alert("Por favor, introduce un monto válido.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${API_URL}/gastos`,
        formData,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      const nuevoGasto = res.data;
      const nuevosGastos = [...gastos, nuevoGasto];
      setGastos(nuevosGastos);
      setFormData({ categoria: "", monto: "", fecha: "", descripcion: "" });
      verificarGastoTotal(nuevosGastos);
    } catch (err) {
      setError("Error al añadir gasto");
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/gastos/${id}`, {
        headers: {
          "x-auth-token": token,
        },
      });
      const nuevosGastos = gastos.filter((gasto) => gasto._id !== id);
      setGastos(nuevosGastos);
      verificarGastoTotal(nuevosGastos);
    } catch (err) {
      setError("Error al eliminar gasto");
    }
  };

  useEffect(() => {
    const limite = localStorage.getItem("limiteMensual");
    if (limite) {
      setGastoMaximo(Number(limite));
    } else {
      const limiteNumerico = prompt("¿Cuál es tu gasto máximo mensual?");
      if (limiteNumerico) {
        setGastoMaximo(limiteNumerico);
        localStorage.setItem("limiteMensual", limiteNumerico);
      }
    }
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Mis Gastos</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Categoría:</label>
            <input
              type="text"
              name="categoria"
              value={categoria}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Monto:</label>
            <input
              type="number"
              name="monto"
              value={monto}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Fecha:</label>
            <input
              type="date"
              name="fecha"
              value={fecha}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Descripción:</label>
            <input
              type="text"
              name="descripcion"
              value={descripcion}
              onChange={onChange}
            />
          </div>
          <button type="submit">Agregar Gasto</button>
        </form>

        <ul>
          {gastos.map((gasto) => (
            <li key={gasto._id}>
              {gasto.categoria}: €{gasto.monto.toFixed(2)} -{" "}
              {new Date(gasto.fecha).toLocaleDateString()}
              <button
                className="delete-button"
                onClick={() => handleDelete(gasto._id)}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>

        <GraficaGastos />

        <div className="gasto-maximo-container">
          <label>Gasto Máximo Mensual:</label>
          <input
            type="number"
            name="gastoMaximo"
            value={gastoMaximo}
            onChange={(e) => setGastoMaximo(e.target.value)}
          />
          <button
            className="button-limite"
            onClick={() => {
              verificarGastoTotal(gastos);
            }}
          >
            Actualizar Límite
          </button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
