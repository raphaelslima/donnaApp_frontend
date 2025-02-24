import axios from "axios";

// https://viacep.com.br/ws/01001000/json/

const api = axios.create({
    baseURL: 'http://localhost:3000/'
})

export default api