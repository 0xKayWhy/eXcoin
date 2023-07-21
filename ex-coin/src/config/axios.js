
import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

const axiosConfig = axios.create({
  // .. configure axios baseURL
  baseURL: `${baseURL}`
});


export default axiosConfig;