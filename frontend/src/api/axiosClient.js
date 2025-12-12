import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:5000/api",   // your backend base path
  withCredentials: true                  // send cookies if using JWT cookies
});

export default axiosClient;
  