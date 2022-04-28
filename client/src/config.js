import axios from "axios";

// let URL = "https://animes-on.herokuapp.com/api/";

let DEVELOPURL = "http://localhost:5000/api/";

export const axiosInstance = axios.create({
    baseURL: DEVELOPURL    
});