import axios from 'axios'

const axiosApi = axios.create({
    baseURL: process.env.BACKEND,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true,
})

export default axiosApi;