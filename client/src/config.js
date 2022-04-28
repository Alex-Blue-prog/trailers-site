import axios from "axios";

// let URL = "https://trailers-on.herokuapp.com/api/";
// let DEVELOPURL = "http://localhost:5000/api/";

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL    
});