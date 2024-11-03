import axios from "axios";

// Usar la variable de entorno para la URL de la API
const API_URL = import.meta.env.VITE_API_URL;

export const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/auth/register`, userData);
};

export const loginUser = async (userData) => {
  return await axios.post(`${API_URL}/auth/login`, userData);
};

export const getUsers = async () => {
  return await axios.get(`${API_URL}/users`);
};

export const getUserById = async (userId) => {
  return await axios.get(`${API_URL}/users/${userId}`);
};

export const createUser = async (userData) => {
  return await axios.post(`${API_URL}/users`, userData);
};

export const updateUser = async (userId, userData) => {
  return await axios.put(`${API_URL}/users/${userId}`, userData);
};

export const deleteUser = async (userId) => {
  return await axios.delete(`${API_URL}/users/${userId}`);
};

export const createExpense = async (expenseData) => {
  return await axios.post(`${API_URL}/gastos`, expenseData);
};

export const getExpenses = async () => {
  return await axios.get(`${API_URL}/gastos`);
};

export const getExpenseById = async (expenseId) => {
  return await axios.get(`${API_URL}/gastos/${expenseId}`);
};

export const updateExpense = async (expenseId, expenseData) => {
  return await axios.put(`${API_URL}/gastos/${expenseId}`, expenseData);
};

export const deleteExpense = async (expenseId) => {
  return await axios.delete(`${API_URL}/gastos/${expenseId}`);
};
