import { message } from "antd";
import axios from "axios";
import Cookies from "js-cookie";

const request = axios.create({
  baseURL: "https://aab-admin-server.up.railway.app/api/v1/",
  timeout: 10000,
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
