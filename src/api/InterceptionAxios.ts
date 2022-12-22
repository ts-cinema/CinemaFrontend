import axios from "axios";

const interceptionAxios = axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 3000
});

export default interceptionAxios;