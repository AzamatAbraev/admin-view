import { message } from "antd";
import axios from "axios";
import Cookies from "js-cookie";

const request = axios.create({
  baseURL: "http://localhost:5000/api/v1/",
  timeout: 1000,
  headers: { Authorization: `Bearer ${Cookies.get("TOKEN")}` },
});

request.interceptors.response.use(
  async (response) => {
    return response;
  },
  (err) => {
    message.error(err.response.data.msg);
    return Promise.reject(err);
  },
);

export default request;
