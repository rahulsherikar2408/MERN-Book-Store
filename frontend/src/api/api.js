import axios from "axios";

const api = axios.create({
  baseURL: "https://mern-book-list.onrender.com/api",
  withCredentials: true
});

export default api;