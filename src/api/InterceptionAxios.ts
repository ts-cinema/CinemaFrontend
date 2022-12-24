import axios from "axios";

const interceptionAxios = axios.create({
    baseURL: 'https://localhost:16001',
    timeout: 10000
});

export default interceptionAxios;