import axios from "axios";
import { HOST } from "./constants";

const api = axios.create({
    baseURL: HOST
});

export default api;
