import axios from 'axios';

const axiosInstance = axios.create({ // this defines the GLOBAL URL endpoint, to be changed to heroku URL when we migrate the Heroku
    baseURL: "http://localhost:5000",
    // withCredentials: true,
})

export default axiosInstance;