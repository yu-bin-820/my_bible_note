import axios from 'axios';
import { PROTOCOL, BASE_URL, PORT } from "../constant/constant.js";

const axiosInstance = axios.create({
    baseURL: `${PROTOCOL}://${BASE_URL}:${PORT}`,
});

const fetcher = url => axiosInstance.get(url, {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
}).then(res => res.data)
    .catch(error => {
        if (error.response && error.response.status === 401) {
            throw new Error('Unauthorized');
        }
        throw error;
    });

export default fetcher;
