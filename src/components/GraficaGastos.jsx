import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

const API_URL = import.meta.env.VITE_API_URL; // Usar la variable de entorno

const GraficaGastos = () => {
  const [gastos, setGastos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGastos = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/gastos`, {
          headers: {
            "x-auth-token": token,
          },
        });
        setGastos(response.data);
      } catch (error) {
        setError("Error al obtener los gastos");
      } finally {
        setLoading(false);
      }
    };

    fetchGastos();
  }, []);

  const data = {
    labels: gastos.map((gasto) => new Date(gasto.fecha).toLocaleDateString()),
    datasets: [
      {
        label: "Gastos",
        data: gastos.map((gasto) => gasto.monto),
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Gráfica de Gastos</h2>
      <p className="aclaracion">
        (Recarga la página para actualizar la gráfica con los nuevos gastos.)
      </p>
      <Line data={data} />
    </div>
  );
};

export default GraficaGastos;
