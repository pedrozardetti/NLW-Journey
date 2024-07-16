import axios from "axios";

const api = axios.create({
    baseURL: 'https://planner-rest.onrender.com/'
});

export default api;