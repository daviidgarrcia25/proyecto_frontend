import React, { useState, useEffect } from "react";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../api/api"; 

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ nombre: "", email: "", password: "" });
  const [editMode, setEditMode] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editMode) {
      await updateUser(currentUserId, formData);
    } else {
      await createUser(formData);
    }
    resetForm();
    fetchUsers();
  };

  const handleEdit = (user) => {
    setFormData({ nombre: user.nombre, email: user.email, password: "" });
    setEditMode(true);
    setCurrentUserId(user._id);
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchUsers();
  };

  const resetForm = () => {
    setFormData({ nombre: "", email: "", password: "" });
    setEditMode(false);
    setCurrentUserId(null);
  };

  return (
    <div>
      <h2>Gestión de Usuarios</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Contraseña"
          required
        />
        <button type="submit">{editMode ? "Actualizar" : "Crear"}</button>
        <button type="button" onClick={resetForm}>Cancelar</button>
      </form>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.nombre} - {user.email}
            <button onClick={() => handleEdit(user)}>Editar</button>
            <button onClick={() => handleDelete(user._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
